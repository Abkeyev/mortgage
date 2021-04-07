## Страницы

[Figma](https://www.figma.com/file/OnOgpP3M4Cs6c38bmWInBJ/Redesign-bcc.kz?node-id=2945%3A0)

##

[Website](https://abkeyev.github.io/bcc-redesign/).

##

## Available Scripts

при наличии папки `node_modules` снести ее

### `yarn`

установить все зависимости

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `sudo docker build -t bcc:dev .`

собирает докер-образ

### `sudo docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true bcc:dev`

запускает докер-образ в интерактивном режиме на порту 3001
