---
title: Programming a Chess Engine I - Bitboards
description: Let's build a chess engine from scratch in Rust, starting with representing the board using bitboards.
pubDatetime: 2023-08-23
postSlug: chess-engine-1
draft: false
featured: false
tags:
  - devlog
  - chess
  - programming
  - rust
---

I've been eyeing Rust for many months now, and it's a programming language I really want to learn for the fun of it. What better way to learn a new programming language than to start a new project?

## Introduction

I've had an "on and off" relationship with the game of chess, and I find it to be the most satisfying but also the most frustrating game I've ever played. What has always intrigued me though, is the idea of writing a chess engine—and a decent one, at that. So I'll be documenting my progress throughout these devlogs, and hopefully I learn something and maybe you can learn something too.

> A chess engine is a computer program that analyzes a chess position and generates the best possible move or moves to play in that position.

The most powerful chess engine in the world at the time of writing this article is [Stockfish](https://stockfishchess.org/), and it consistently wipes the floor with the best chess players in the world. Although I don't expect to build anything close to Stockfish, there's a lot I can learn from it.

Written in C++, Stockfish can process positions incredibly fast. It's one of a variety of reasons why it is so powerful, and it tells me that speed is incredibly important. That's why I think Rust would be a great language to build a chess engine in, due to its low level and fast speeds.

Before we can jump into programming something to play chess, I'd like to start by first programming chess itself. To start, we need to start with representing the chessboard.

## Bitboards

There's a multitude of ways to represent the chessboard, with the most instinctive implementation being an eight by eight, two dimensional array of chess pieces.

```rust
let mut chessboard = [[Piece; 8]; 8];
```

Although this is easy to implement, it is not the smartest implementation due to flaws around efficiency. Manipulating and reading a two dimensional array is a slow process, and due to the **square-centric** nature of it, pieces need to be _searched_ which is an `O(n*m)` process for a two dimensional array.

That's why I'll be implementing the chessboard using **bitboards**. Lucky for me, the chessboard is an eight by eight grid of sixty-four squares. This means it's possible to represent the board in binary using a single 64-bit unsigned integer, with ones representing a piece and zeros representing the absence of a piece. This means we no longer need to search for pieces as this strategy is **piece-centric**, meaning we are tracking the pieces themselves and not the individual squares of the board. Bitboards are also extremely fast, as we can use bitwise operations to manipulate and search the board. I should note we'll have to maintain a bitboard for every chess piece, but that is a rather insignificant hit to memory.

Let's look at an example of bitboards. Suppose we have a chessboard in its starting position. I'll quickly represent that in text, with white pieces in uppercase and black pieces in lowercase:

```
    a  b  c  d  e  f  g  h
  +------------------------+
8 | r  n  b  q  k  b  n  r | 8
7 | p  p  p  p  p  p  p  p | 7
6 |                        | 6
5 |                        | 5
4 |                        | 4
3 |                        | 3
2 | P  P  P  P  P  P  P  P | 2
1 | R  N  B  Q  K  B  N  R | 1
  +------------------------+
    a  b  c  d  e  f  g  h
```

Now let's say we want to view the bitboard for white pawns, what is that going to look like? Take all other pieces off the board since bitboards are binary, meaning either a white pawn occupies that square or it doesn't. I'll also go ahead and insert those binary values.

```
    a  b  c  d  e  f  g  h
  +------------------------+
8 | 0  0  0  0  0  0  0  0 | 8
7 | 0  0  0  0  0  0  0  0 | 7
6 | 0  0  0  0  0  0  0  0 | 6
5 | 0  0  0  0  0  0  0  0 | 5
4 | 0  0  0  0  0  0  0  0 | 4
3 | 0  0  0  0  0  0  0  0 | 3
2 | 1  1  1  1  1  1  1  1 | 2
1 | 0  0  0  0  0  0  0  0 | 1
  +------------------------+
    a  b  c  d  e  f  g  h
```

Simple enough. Since there are 64 squares, there are 64 values. These corelate to a bit of a 64-bit unsigned integer.

```
    a  b  c  d  e  f  g  h
  +------------------------+
8 | 0  0  0  0  0  0  0  0 | 8       00000000
7 | 0  0  0  0  0  0  0  0 | 7       00000000
6 | 0  0  0  0  0  0  0  0 | 6       00000000
5 | 0  0  0  0  0  0  0  0 | 5   =   00000000   =   0000000000000000000000000000000000000000000000001111111100000000
4 | 0  0  0  0  0  0  0  0 | 4       00000000
3 | 0  0  0  0  0  0  0  0 | 3       00000000
2 | 1  1  1  1  1  1  1  1 | 2       11111111
1 | 0  0  0  0  0  0  0  0 | 1       00000000
  +------------------------+
    a  b  c  d  e  f  g  h
```

We can also write those binary numbers in hexadecimal just so we don't have to deal with such long numbers.

```rust
0x000000000000FF00 = 0b0000000000000000000000000000000000000000000000001111111100000000
```

## Implementation

With that out of the way, we can start implementing these bitboards in Rust. Let's make a variable for each bitboard.

```rust
pub struct Board {
    white_pawns_bitboard: u64,
    white_knights_bitboard: u64,
    white_bishops_bitboard: u64,
    white_rooks_bitboard: u64,
    white_queens_bitboard: u64,
    white_king_bitboard: u64,

    black_pawns_bitboard: u64,
    black_knights_bitboard: u64,
    black_bishops_bitboard: u64,
    black_rooks_bitboard: u64,
    black_queens_bitboard: u64,
    black_king_bitboard: u64
}
```

I actually hate having so many variables for this, so I'm going to pretty this up by defining `enum`s for color and piece type, allowing us store all the bitboards in an array in which we can easily index from using `Color` and `Piece` values.

```rust
pub enum Color { White, Black }
pub enum Piece { Pawn, Knight, Bishop, Rook, Queen, King }

pub struct Board {
    bitboards: [[u64; 6]; 2]
}
```

Much better. Now we can create a function that populates our chessboard into its starting position. Note that these are the hexadecimal representations of each piece's bitboard, computed exactly by following the steps earlier in this post.

```rust
impl Board {

    pub fn start_pos() -> Board {
        Board { bitboards: [
            0x000000000000FF00,
            0x0000000000000042,
            0x0000000000000024,
            0x0000000000000081,
            0x0000000000000008,
            0x0000000000000010
        ], [
            0x00FF000000000000,
            0x4200000000000000,
            0x2400000000000000,
            0x8100000000000000,
            0x0800000000000000,
            0x1000000000000000
        ]}
    }

}
```

With bitboards finally implemented, we can create a chessboard with a single call to the `start_pos` method, and retrieve the piece bitboard of our choosing with indexing. Remember to cast the `enum` values as `usize` to index an array in Rust.

```rust
let board = Board::start_pos();

let wp = board.bitboards[Color::White as usize][Piece::Pawn as usize]; // White Pawns
let wr = board.bitboards[Color::White as usize][Piece::Rook as usize]; // White Rooks
let bb = board.bitboards[Color::Black as usize][Piece::Bishop as usize]; // Black Bishops
let bk = board.bitboards[Color::Black as usize][Piece::King as usize]; // Black King
```

Bitboards will play a much more significant role when I start implementing move generation and evaluation. But for now, that's a good start to building the game of chess.

[View the source code here](https://github.com/nicholasdly/chess), but be aware that code may have changed from that of this article, especially if this article is older.
