---
title: The Binary System Explained
description: Understand the basics of the binary system and bitwise operations.
pubDatetime: 2023-08-24
postSlug: binary-explained
draft: false
featured: false
tags:
  - math
  - programming
---

## Table of contents

## Introduction

### What is binary?

There's an infinite number of ways to represent numbers, all with their own unique notation, history, and use cases. For many hundred years though, [positional notation](https://en.wikipedia.org/wiki/Positional_notation) has reigned for its efficiency and flexibility in arithmetic.

A significant feature of positional notation is a number's **base**, signified by its radix. People have settled on the **base-ten** system, a system composed of ten digits—zero through nine—otherwise known as the **decimal system**. Although there isn't an exact reason for this, it is presumed due to how it naturally compliments counting with our ten fingers.

> A number's base, or **radix**, is denoted with a numerical subscript such as 58<sub>10</sub> or 101<sub>2</sub>. Be aware that a number's base cannot be identified just by its digits, as 101<sub>10</sub> and 101<sub>2</sub> are very different numbers.

On the other hand, computers do not have ten fingers to compliment how they compute. Computers work via billions of on and off signals, and therefore utilize the **base-two** system, a system composed of two digits—zero and one—otherwise known as the **binary system**.

> Since the binary system only utilizes two digits, the place value of each digit is different than that of the decimal system.
>
> More specifically, while each place has ten times the value of the place to its right in base-ten, each place has _two_ times the value of the place to its right in base-two.

For example, the binary number 11010<sub>2</sub> is equivalent to 26<sub>10</sub> in the decimal system. Since there are more digits in the decimal system, you can usually write fewer digits to write the same number in base-ten than base-two.

### How does binary work?

Counting with our fingers in the base-two system is similar to counting with our fingers in the base-ten system, except you only have _one_ finger to represent zero or one. When you run out of fingers, you would need to note how many times you ran out of fingers, and then start counting from zero again.

| Fingers      | Binary          | Conversion                                                   | Decimal        |
| ------------ | --------------- | ------------------------------------------------------------ | -------------- |
| ✊           | 0<sub>2</sub>   | 0 \* 2<sup>0</sup>                                           | 0<sub>10</sub> |
| ☝️           | 1<sub>2</sub>   | 1 \* 2<sup>0</sup>                                           | 1<sub>10</sub> |
| ☝ + ✊      | 10<sub>2</sub>  | 1 \* 2<sup>1</sup> + 0 \* 2<sup>0</sup>                      | 2<sub>10</sub> |
| ☝️ + ☝️      | 11<sub>2</sub>  | 1 \* 2<sup>1</sup> + 1 \* 2<sup>0</sup>                      | 3<sub>10</sub> |
| ☝️ + ✊ + ✊ | 100<sub>2</sub> | 1 \* 2<sup>2</sup> + 0 \* 2<sup>1</sup> + 0 \* 2<sup>0</sup> | 4<sub>10</sub> |
| ☝️ + ✊ + ☝️ | 101<sub>2</sub> | 1 \* 2<sup>2</sup> + 0 \* 2<sup>1</sup> + 1 \* 2<sup>0</sup> | 5<sub>10</sub> |

Notice that when converting binary to decimal, the place of the digit tells you what power of two you should multiply by that digit by. And just like the decimal system, once one digit reaches its maximum value, it "resets" and the one is carried over to the left.

## Bitwise Operators

Computers use binary to represent everything. Whether its a number, a floating point number, text, or a single character, its raw form is a series of zeros and ones called **bits**. Computers use **bitwise operations** to manipulate memory and perform logic, just like hardware circuits.

### Bitwise AND

The bitwise AND operator `&` performs [logical conjunction](https://en.wikipedia.org/wiki/Logical_conjunction) on the bits of its operands. For each pair of _nonzero_ bits occupying the same digit position in the two numbers, it returns a one. All other positions return zero.

This results in the **intersection** of the operands. Arithmetically, this is equivalent to the **product** of each pair of bits occupying the same position.

![Bitwise AND Demo](/assets/binary/bitwise_and.gif)

### Bitwise OR

The bitwise OR operator `|` performs [logical disjunction](https://en.wikipedia.org/wiki/Logical_disjunction) on the bits of its operands. For each pair of bits occupying the same digit position in the two numbers, it returns a one as long one of the two bits is _nonzero_. All other positions return zero.

This results in the **union** of the operands. Arithmetically, this is equivalent to the **sum** of the bit values minus the **product** of the bit values.

![Bitwise OR Demo](/assets/binary/bitwise_or.gif)

### Bitwise XOR

The bitwise XOR (exclusive or) operator `^` performs [exclusive disjunction](https://en.wikipedia.org/wiki/Exclusive_or) on the bits of its operands. For each pair of of bits occupying the same digit position in the two numbers, it returns a one only if the two bits are opposing bit values. All other positions return zero.

This results in the **symmetric difference** of the operands. Arthmetically, this is equivalent to the **sum** of the bit values modulo two.

![Bitwise XOR Demo](/assets/binary/bitwise_xor.gif)

### Bitwise NOT

The bitwise NOT operator `~` performs [logical negation](https://en.wikipedia.org/wiki/Negation) on the bits of its operands. Each bit is inverted, turning zeros into ones and ones into zeros.

Arithmetically, this is equivalent to the **subtraction** of individual bit values from one.

![Bitwise NOT Demo](/assets/binary/bitwise_not.gif)

### Bitwise Left Shift

The bitwise left shift operator `<<` moves the bits of its first operand to the left by the number of places specified in its second operand by insertting zeros on the side of the least significant bit.

Remember that the place of the binary digit tells you what power of two it is, meaning each left shift you are **doubling** the number.

![Bitwise Left Shift Demo](/assets/binary/bitwise_leftshift.gif)

### Bitwise Right Shift

The bitwise right shift operator `>>` moves the bits of its first operand to the right by the number of places specified in its second operand by truncating the least significant bit.

Remember that the place of the binary digit tells you what power of two it is, meaning each right shift you are **floor dividing** the number in half.

![Bitwise Right Shift Demo](/assets/binary/bitwise_rightshift.gif)

## Bitmasks

We can use bitwise operators along with **bitmasks** to isolate and apply functions on selective bits. For example, we can retrieve the first three bits of any binary number by applying bitwise AND between the number and 111<sub>2</sub>. We can also set the first three bits of any binary number by applying bitwise OR between the number and 111<sub>2</sub>.
