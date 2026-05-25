---
title: Annotating stuff in python
publishedAt: 2020-09-10
description: 
author: rubbie-kelvin
categories:
  - python
  - programming
mainImage: /images/06ab0b6d02fac52567c5c0071da267ad5cc903a4-800x420.png
external_link: "https://codewithrubbie.hashnode.dev/annotating-stuffs-in-python-1"
---

> Annotations in Python are a way to attach metadata to function parameters and return values, primarily used for type hints. They help improve code readability and can be utilized by tools like IDEs and static type checkers, but they do not enforce type checking at runtime.

A lot of times, we run into bugs while writing python scripts, most of which is caused by wrong variable types in the wrong places. Unlike other languages like c++ and java, python is dynamically typed, which is an advantage of the language as well as a disadvantage because a variable type can be change at any point in run time.

Most times we try to fix these bugs by commenting & documenting several parts of the code. Although using annotations doesn't compare to C++ (or java, C) static typing and isn’t a way to validate types “out of the box”, annotations could be used for further documentation as they can describe variable, argument and function return types.

## Pushing through

While you follow up with this article, you’ll notice I assume you have basic knowledge of python, especially variables and function. I assume you’re running python 3, as syntax support for annotations was introduced in python 3.0. I’ll encourage you to give feedback and also report errors i made at some point in this article. Also to follow up with this article, you’ll need a python IDE or a modern text editor like sublime text, vs code (make sure code suggestions are enabled and necessary python plugins are installed).

### Annotating variables

```python
name:str = "rubbie"
```


While studying the line of code above, you notice the only difference between this and naming a variable regularly is that there a colon between the variable name and the proposed variable type. Pretty easy right? Just to be in check, lets go through a few points to note about annotations.

- Annotations are optional

- Annotations do not ensure static typing

- Annotations simply provide type hints to variables

- Annotations let IDEs show function arguments and return types

- Annotations are nothing more than a way of associating python expressions with a variable or various parts of a function at compile time. Python itself, doesn’t attach any significance to annotations.

Having read the points above, you should understand how the following code works.

```python
age:int
print(age)
```

the code above would raise a NameError in line 2, because line one doesn't define the variable age, but only registers a description for it.

### Annotating Functions Arguments

```python
def triple(num:int):
    """
    triples a number
    :num this number would be tripled
    """
    return num*3

```

annotating functions is really useful, especially if you create python libraries for other developers. When writing in this function’s scope, your IDE would think of num as an integer and would suggest you pass an integer when you try to call it.

### Annotating Function return value

annotating return types isn’t like the first two we discussed, but still isn’t difficult to understand.

```python
def triple(num:int) -> int:
    # …
    return num*3
```

this piece of code describes the return value of triple to be an integer in your IDE. Go ahead an try out these examples on your IDE, as you use annotations, you’ll figure out how helpful they are while writing your next script.

### Accessing Annotations

All annotations are stored in a dictionary named __annotations__, which is an attribute of a function. Here’s an example.

```python
def tenPercent(num:int) -> float:
    # …
    return num * .1

print(tenPercent.__annotations__)

```

That’s all for this article. If you need to provide type checking in your functions, there are simple ways to go about it, which I wouldn't be going through in this article.

*Happy bug hunting.*
