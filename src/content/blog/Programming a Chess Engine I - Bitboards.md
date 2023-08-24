---
title: Programming a Chess Engine I - Bitboards
description: Let's build a chess engine from scratch in Rust, starting with representing the board using bitboards.
pubDatetime: 2023-08-24T17:38:00Z
draft: false
featured: true
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

The most powerful chess engine in the world at the time of writing this article is [Stockfish](https://stockfishchess.org/), and it consistently wipes the floor with the best chess players on the planet. Although I don't expect to build anything close to Stockfish, there's a lot I can learn from it.

Written in C++, Stockfish can process positions incredibly fast. It's one of a variety of reasons why it is so powerful, and it tells me that speed is incredibly important. That's why I think Rust would be a great language to build a chess engine in, due to its low level, friendly compiler, and fast speeds.

Before we can jump into programming something to play chess, I'd like to start by first programming chess itself. To start, we need to start with representing the chessboard.

## Bitboards

There's a multitude of ways to represent the chessboard, with the most instinctive implementation being an eight by eight two dimensional array of the chess pieces.

```rust
let mut chessboard = [[Piece; 8]; 8];
```

Although this is possible and easy to implement, it comes with many problems mainly around efficiency. Manipulating and reading a two dimensional array is a slow process, and due to the **square-centric** nature of it, pieces need to be _searched_ which is an `O(n*m)` process.

That's why I'll be implementing the chessboard using **bitboards**. Lucky for me, the chessboard is an eight by eight grid of sixty-four squares. This means it's possible to represent the board in binary using a single 64-bit unsigned integer, with ones representing a piece and zeros representing the absence of a piece. This means we no longer need to search for pieces as this strategy is **piece-centric**, meaning we are tracking the pieces themselves and not the individual squares of the board.

Bitboards are also extremely fast, as we can use bitwise operations to manipulate the board over matrix operations. The only con is that we'll have to maintain a bitboard for every chess piece, but that is an insignificant hit on memory at the end of the day.

```rust
pub struct Board {
    white_pawns: u64,
    white_knights: u64,
    white_bishops: u64,
    white_rooks: u64,
    white_queens: u64,
    white_king: u64,

    black_pawns: u64,
    black_knights: u64,
    black_bishops: u64,
    black_rooks: u64,
    black_queens: u64,
    black_king: u64
}
```

We can pretty this up by defining enums for color and piece type, allowing us store all the bitboards in an array in which we can easily index from.

```rust
pub enum Color { White, Black }
pub enum Piece { Pawn, Knight, Bishop, Rook, Queen, King }

pub struct Board {
    bitboards: [[u64; 6]; 2]
}
```

Now we can create a function that populates our chessboard into its traditional starting position.

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
```

Note I'm using hexidecimal values just so I don't need to write the tediously long binary equivalent. With bitboards finally implemented, we can create a chessboard and retrieve the piece bitboard of our choosing.

```rust
let board = Board::start_pos();

let wp = board.bitboards[Color::White as usize][Piece::Pawn as usize]; // White Pawns
let wr = board.bitboards[Color::White as usize][Piece::Rook as usize]; // White Rooks
let bb = board.bitboards[Color::Black as usize][Piece::Bishop as usize]; // Black Bishops
let bk = board.bitboards[Color::Black as usize][Piece::King as usize]; // Black King
```

Bitboards will play a much more significant role when I start implementing move generation and evaluation. But for now, that's a good start to building the game of chess.

[View the source code here](https://github.com/nicholasdly/chess), but be aware that code may have changed from that of this article, especially if this article is older.
