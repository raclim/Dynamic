## GET
```/goods
```
returns 

```{ 
  description: "Things that made me happy this week.",
  goods: [
    "my mom",
    "cheese",
    "love",
    ...
  ]
}
```

## POST 
will add good 

## DELETE

deletes the name from: 
```/goods/:name
```
if name is cheese: 

```{ 
  description: "Things that made me happy this week.",
  goods: [
    "my mom",
    "love",
    ...
  ]
}
```
