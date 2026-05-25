---
title: "Getpass: Hiding sensitive input from the shell"
publishedAt: 2021-01-14
description: 
author: rubbie-kelvin
categories:
  - python
mainImage: /images/eccf288bd51391081939af5e525fe9085d81f8ef-1080x600.png
external_link: "https://codewithrubbie.hashnode.dev/getpass-hiding-sensitive-input-from-the-shell"
---

# Getpass: Secure Password Prompt

> This article is mostly part of Doug Hellmann's "The Python3 Standard Library by Example" book.

The strength of [Python’s](https://python.org/) standard library is its size. It includes implementations of so many aspects of a program’s structure that developers can concentrate on what makes their application unique, instead of having to write all the basic pieces over and over again. This series covers some of the more frequently reused building blocks that solve problems common to so many applications. This article would be short and straight forward, compared to the last one i wrote on argpase... Let's just get started.

## getpass() : the function.

Many programs that interact with the user via the terminal need to ask the user for password values without showing what the user types on the screen. The getpass module provides a portable way to handle such password prompts securely. The getpass() function prints a prompt, then reads input from the user until the user presses the enter key. The input is returned as a string to the caller.

```python
import getpass

try:
    password: str = getpass.getpass()

except Exception as e:
    print('ERROR:', e)

else:
    print('You entered:', password)
```

The result on the terminal:

```
$ python file.py
Password:
You entered: mypassword
```

The default prompt is *"Password"*, and the prompt value can be altered by adding a new argument.

```python
import getpass

age = getpass.getpass(prompt="How old are you?")
age: int = int(age)  # lets assume the user only inputs an integer value

if age >= 18:
    print("logging in...")
else:
    print("you cant access this content!")
```

The result on the terminal:

```
$ python file.py
How old are you?
logging in...
```

## Changing the stream

By default, getpass() uses sys.stdout to print the prompt string. For a program that may produce useful output on sys.stdout , it is frequently a better choice to send the prompt to another stream such as sys.stderr.

```python
import sys
import getpass

password: str = getpass.getpass(stream=sys.stderr)
print('You entered:', password)

```

Using sys.stderr for the prompt means standard output can be redirected (to a pipe or file) without seeing the password prompt. The value entered by the user is not echoed back to the screen.

```
$ python file.py > /dev/null
Password:
```

## Using getpass without a Terminal

Under Unix, getpass() always requires a tty it can control via termios , so input echoing can be disabled. With this approach, values will not be read from a non-terminal stream redirected to standard input. Instead, getpass tries to get to the tty for a process, and no error is raised if the function can access it.

```
$ echo "not secret" | python file.py
Password:
You entered: secret
```

The caller is responsible for detecting when the input stream is not a tty, and using an alternative method for reading in that case.

```python
import getpass
import sys

if sys.stdin.isatty():
    password = getpass.getpass('Using getpass: ')

else:
    print('Using readline')
    password = sys.stdin.readline().rstrip()

print('Read: ', password)
```

Output with a tty:

```
$ python file.py
Using getpass:
Read: secret

```

For the most basic cases all you'll need is the getpass() function, but if you find the extra details helpful, as well as the rest of the article... feel free to [follow me on twitter](https://x.com/kelvinrubbie). and also leave a comment if you have any issues following this tutorial. Happy coding!

