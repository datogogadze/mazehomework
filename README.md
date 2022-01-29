# mazehomework

```
git clone https://github.com/datogogadze/mazehomework.git &&
cd mazehomework &&
npm install &&
npm start
```

- to creatre maze - POST: localhost:3000/maze/create, body: { "maze": [3, 1, [2, [5,[4, 3]]], []] }
- to find value - POST: localhost:3000/maze/find, body: { "operator": "greater", "value": 2 }
