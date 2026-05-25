---
title: Tips to help you write clean python scripts
publishedAt: 2020-06-10
description: 
author: rubbie-kelvin
categories:
  - python
mainImage: /images/582af75f437b769cdde4854f1e61edc68ea13385-1280x600.png
external_link: "https://codewithrubbie.hashnode.dev/tips-to-help-you-write-clean-python-scripts"
---

## Avoid Overriding Built-in Functions

Using Python's built-in names as variable names can override their default behavior, making them unavailable or causing errors.

```python
# Bad
id = 2
zip = 567890
class = "physics" # Keywords would throw a syntax error

# Good
user_id = 2
zip_code = 567890
class_ = "physics"

```

## Follow Naming Conventions

Use proper naming conventions for better readability. Camel case and snake case are the most common styles.

```python
# Bad
secondary_Title = "hello world"
Name = "rubbie" # Use lowercase for variables

# Good
secondaryTitle = "hello world" # Camel case
secondary_title = "hello world" # Snake case

# Use PascalCase for classes
class ProximitySensor:
  def read(self):
    """
    1. Use triple quotes for docstrings.
    2. Explain the purpose of the function clearly.
    """
    pass

# Use UPPERCASE with underscores for constants
PI = 3.141592
OPERATIONAL_EFFICIENCY = 0.67
```

## Use Spaces Instead of Tabs

> I'm a tabs person btw

Using tabs can cause inconsistent formatting across different editors. Use spaces instead (preferably 4 per indentation level) to ensure consistent readability.

## Simplify Boolean Expressions

Avoid unnecessary conditional statements when assigning Boolean values.

```python
# Poor
boys, girls = 5, 19
if boys == girls:
  equal = True
else:
  equal = False

# Better
boys, girls = 5, 19
equal = boys == girls
```

## Use Ternary Operators for Simple Conditions

```python
# Instead of this
if is_active:
  x = 1
else:
  x = -1

# Do this
x = 1 if is_active else -1
```

## Improve Readability of Large Numbers

Use underscores to separate digits in large numbers for better readability.

```python
connections_accepted = 1_000_000_000_000
connections_rejected = 1_000
connections_total = connections_accepted + connections_rejected
```

## Manage Resources with Context Managers

Manually opening and closing files is prone to errors. Use with statements to manage file resources efficiently.

```python
# Bad
file = open("text.txt")
content = file.read()
file.close()

# Good
with open("text.txt") as file:
  content = file.read()
```

## Track Index While Looping

Avoid manually tracking index variables when looping through lists.

```python
# Bad
items = ["apple", "pear", "papaya", "mango"]
index = 0

for item in items:
  print(index, item)
  index += 1

# Good
for index, item in enumerate(items):
  print(index, item)

# Start from index 1
for index, item in enumerate(items, start=1):
  print(index, item)
```

## Loop Through Multiple Lists with zip

Instead of manually managing multiple lists, use zip().

```python
# Bad
names = ["rubbie", "jerome", "carlie", "angie"]
hobbies = ["painting", "surfing", "cycling", "singing"]
index = 0

for name in names:
  print(f"{name} loves {hobbies[index]}")
  index += 1

# Good
for name, hobby in zip(names, hobbies):
  print(f"{name} loves {hobby}")
```

## Use Underscore for Unused Variables

If a loop variable is unnecessary, replace it with an underscore (_).

```python
# Bad
for i in range(6):
  do_something()

# Good
for _ in range(6):
  do_something()
```

## Use Annotations for Code Clarity

Annotations help define function input and return types, making the code easier to understand.

```python
# Without annotations
def add(a, b):
  return a + b

# With annotations
def add(a: int, b: int) -> int:
  return a + b
```


Annotations are optional but improve code readability, especially in larger projects.

These tips will help you write cleaner and more efficient Python scripts. There's always more to learn, but this is a great starting point!
