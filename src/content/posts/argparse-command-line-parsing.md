---
title: "Argparse: Command-line parsing."
publishedAt: 2021-01-02
description: 
author: rubbie-kelvin
categories: []
mainImage: /images/4408f645b56a558fc306ad4660ec17ebc0c5ce17-1080x600.png
external_link: "https://codewithrubbie.hashnode.dev/argparse-command-line-parsing"
---

The strength of [Python’s](https://python.org/) standard library is its size. It includes implementations of so many aspects of a program’s structure that developers can concentrate on what makes their application unique, instead of having to write all the basic pieces over and over again. This series covers some of the more frequently reused building blocks that solve problems common to so many applications.

Argparse is an interface for parsing and validating command-line arguments. It supports converting arguments from strings to integers and other types, running callbacks when an option is encountered, setting default values for options not provided by the user, and automatically producing usage instructions for a program. This article will help you apply your knowledge of argparse in an actual project.

# Gear Up!

## What we'll be doing

We'll be creating a simple todo cli app, using argpase. With our app, we'll be able to:

- add a task

- list all tasks

- check a task

- uncheck a task

- delete a task

## What we won't be doing

I assume you're experienced with the basic aspects of python programming. We would not be going over the basics of python you're expected to have knowledge of python language while reading this article. Also, We'll not be going over the basics of argpase. checkout these articles to get started with argparse.

- [realpython - argpase](https://realpython.com/command-line-interfaces-python-argparse/)

## Getting started

Firstly, we'll be going over features of our app, and the format in which our todo list will be stored. We'll be representing our features with functions, but just before we go over writing our functions, lets determine how our todo list will be stored.

## How we'll store our todo list

the todo file will be saved as a json file, with the top-level object being a javascript array. the array will contain objects representing a todo item with 3 basic keys: id, task, checked.

- the id is a unique key representing the todo item. we'll need this as a pointer to perform specific actions on a todo item.

- the task key will simply contain the task

- the checked key will be used to store boolean values, to indicate if the task has been completed

Here's an example:

```json
[
  {
    "id": 0,
    "task": "fix that bug in line 877",
    "checked": false
  },
  {
    "id": 1,
    "task": "visit angie at her gandma's",
    "checked": true
  }
]

```

Now that we have an idea of how we'll be storing our todolist, lets go ahead and write our functions.

## Coding the features

The most basic thing we need right now, are functions to write and read a todo file. Since its clear we'll be manipulating json strings, you can go ahead and import the json module. For this totorial, we're using a fixed todo name. You can alter the source after understanding this article.

```python
import json

TODO_FILENAME = '.todo'

```

## Writing a todo-list

To write our todo list, all we need to do is open our filename, then write our python list to it as a json file. Opening the TODO_FILENAME with the 'w' parameter, attempts to open TODO_FILENAME and creates it if it doesn't exist.

```python
def write_todo_file(data: list):
    # opening a file as write mode,...
    # creates the file if it doesnt exist
    with open(TODO_FILENAME, 'w') as file:
        # the indent option is to improve readability
        json.dump(data, file, indent=2)

```

## Reading a todo list

Now we'll need a function for reading our todo list. you'll notice the code snippet below is slightly complex than the one above. Here, we'll first need to check if the file exists, and we'll do that using the os.path module. let's go ahead and add a new import.

```python
import os
# ...

```

After importing this library, we can now write our function. first we check is the file exists. if the file exists we just read the data from the file and return whatever we find. In a case where the above operation isn't successful, i.e, the file doesn't exist, we'll create and return an empty list, representing an empty todo list.

```python
def read_todo_file() -> list:
    # check if the file exists
    if os.path.exists(TODO_FILENAME):
        # if it exists, the load the data and return it
        with open(TODO_FILENAME) as file:
            result: list = json.load(file)
        return result
    # else just write and return an empty list
    write_todo_file([])
    return []

```

## Generating unique id

To manipulate our todo-list efficiently, we'll need each todo item with a unique id. We could do something like *every* *n* *number of todo-item in the todo list will hav an id of n.* that could work, but would crash if a number between 1 and n was deleted, and then we add a new item. so instead we find the todo with the biggest number, and then create a new id by adding 1 to its id.

```python
def generate_todo_id(todo_list: list) -> int:
    if not todo_list: return 0 # ----------(i)

    max_id_todo: dict = max( # ------------(ii)
        todo_list,
        key=lambda todo: todo.get("id", 0)
    )

    max_id: int = max_id_todo.get("id", 0)
    return max_id + 1

```

## Creating a todo-item

All we need to do here is construct a new dict object and add it to the list.

```python
def add_todo(task: str):
    todo_list: list = read_todo_file()
    todo = dict(
        id=generate_todo_id(todo_list),
        task=task,
        checked=False
    )
    todo_list.append(todo)
    write_todo_file(todo_list)

```

## Deleting a todo item

To delete a todo, all we have to do is fish out the todo wth the given id, and then make a new list without it.

```python
def delete_todo(id: int):
    todo_list: list = read_todo_file()
    todo_list = [todo for todo in todo_list if not (todo.get("id") == id)]
    write_todo_file(todo_list)

```

## Checking/UnChecking a todo item

To check a todo item, we'll also need the todo's id to locate the todo item. Looping through the todo list, we test if each todo's id match the given id, if we find a match, alter the checked state.

```python
def check_todo(id: int, state: bool):
    todo_list: list = read_todo_file()
    for todo in todo_list:
        if todo.get("id") == id:
            todo["checked"] = state
            break # let's quit the loop
    write_todo_file(todo_list)

```

## printing out a todo list

```python
def print_todo_list():
    todo_list: list = read_todo_file()
    for todo in todo_list:
        todo["checked"] = "checked" if todo.get("checked", False) else "not checked"
        print("{id} [{checked}] {task}".format(**todo))

```

## Testing out our code

Suppose we saved our source as todo.py, launch a python or ipython console in the same directory where your source is located, and then try the following lines.

![](/images/f75c5e574664a4ee360d1c288c754c80aca98c06-656x502.png)

open the file named .todo and you'll see something like this:

```json
[
  {
    "id": 0,
    "task": "publish this article",
    "checked": false
  },
  {
    "id": 1,
    "task": "like all my own tweet :(",
    "checked": true
  }
]

```

### Setting up a parser

Remember our app is a command-line application, we'll now have to set up argparse in our code. our program should be written, so it should work as such:

```
python todo.py --task "take my imaginary girlfriend to dinner" # adds new  to-do
python todo.py --check 1 --id 0     # checks a to-do item with id=0
python todo.py --delete --id 3      # deletes a to-do item with id=3
python todo.py --print              # prints the to-do list

```

> TIP: if you want to skip the python prefix, add the following shebang to the first line of your script.

```sh
#!/usr/bin/env python
#...

```

Now you can do somthing like this on your shell:

```
./todo.py --print

```

## The argparse.ArgumentParser Class

The first step when using argparse is to create a parser object and tell it which arguments to expect. The parser can then be used to process the command-line arguments when the program runs. The constructor for the parser class ( ArgumentParser ) takes several arguments to set up the description used in the help text for the program and other global behaviors or settings.

```python
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        prog="todo",
        description="a simple cli app for managing todo",
        allow_abbrev=False,
        epilog="with love by rubbie"
    )

```

### Defining arguments

argparse is a complete argument-processing library. Arguments can trigger different actions, specified by the action argument to add_argument() . Supported actions include storing the argument (either singly or as part of a list), storing a constant value when the argument is encountered (including special handling for true/false values for Boolean switches), counting the number of times that an argument is seen, and calling a callback to use custom processing instructions.

The default action is to store the argument value. If a type is provided, the value is converted to that type before it is stored. If the dest argument is provided, the value is saved using that name when the command-line arguments are parsed. For this simple program, we'll need 5 arguments:

- id: for specifying a todo items id to be used with actions like delete, check.

- print: for printing our todo list to the console

- task: for creating a new task

- check: for checking/unchecking a todo item

- delete: for deleting a todo-item

Let's go ahead and write our code.

```python
# ...
if __name__ == '__main__':
    # ...

    # arg for passing id
    parser.add_argument(
        "-i", "--id",
        action="store",
        type=int,
        help="specify a todo-items id"
    )

    # args for creating a new to-do item
    parser.add_argument(
        "-t", "--task",
        action="store",
        type=str,
        help="create a new todo item"
    )

    # args for deleting a to-do item
    parser.add_argument(
        "-d", "--delete",
        action="store_true",
        help="deletes a todo item with the given id"
    )

    # args to check a to-do item
    parser.add_argument(
        "-c", "--check",
        action="store",
        type=int,
        help="checkes or uncheckes a todo item [0|1]"
    )

    # arg print the to-do lisy
    parser.add_argument(
        "--print",
        action="store_true",
        help="prints the todo list"
    )

    args = parser.parse_args() # ----------------(i)

```

Now we've set up our arguments and parsed into a variable named args. we'll just need to access our arguments and then call our functions.

```python
# ...
if __name__ == '__main__':
    # ...

    # editing operation
    if not (args.id is None):

        if args.delete:
            # ... delete to-do
            delete_todo(args.id)

        if args.check:
            # ... check to-do
            check_todo(args.id, bool(args.check))

    # add operation
    else:

        if args.task:
            add_todo(args.task)

    # ...
    if args.print:
        print_todo_list()

```

now that we have this in our script, we can go ahead and test our new application in the terminal.

```
./todo.py --task "wrap this up"
./todo.py --check 1 --id 0
./todo.py --print

```

That's all for this tutorial, I hope it works for you 'cus it worked on my machine. if you're having troubles getting this done, please leave a comment below. if it goes well for you, feel free to follow me on [twitter](https://x.com/kelvinrubbie).

If you'd like to follow through the exact same code, you can find the source at [github](https://github.com/rubbieKelvin/argparse-tutorial). happy coding!.



