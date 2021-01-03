# TODO Frontend Side

This project was carried out in order to create the frontend part of the **Addika** test.

## Prerequisites

To run the server it is necessary to have installed:

- **NodeJS** in the version **12.18.x** [NodeJs](https://nodejs.org/en/blog/release/v12.18.4/).
- **NPM** in the version **6.14.x**

## Installation

To get the project up and running, and view components in the browser, complete the following steps:

1. Clone this repo: `git clone https://github.com/junior8adlt/todo_front.git` (HTTPS)
2. Install project dependancies: `npm install`
3. Start the server: `npm run start`
4. Open your browser and visit <http://localhost:3000>

## Creating a static build

To create a static instance of this project, run the following task:

- `npm run build`

## Dependencies

| Package               | Info                                                |
| --------------------- | --------------------------------------------------- |
| axios                 | https://www.npmjs.com/package/axios                 |
| bootstrap             | https://www.npmjs.com/package/bootstrap             |
| jquery                | https://www.npmjs.com/package/jquery                |
| moment                | https://www.npmjs.com/package/moment                |
| popper.js             | https://www.npmjs.com/package/@popperjs/core        |
| react-bootstrap-icons | https://www.npmjs.com/package/react-bootstrap-icons |
| react-moment          | https://www.npmjs.com/package/react-moment          |
| react-redux           | https://www.npmjs.com/package/react-redux           |
| redux                 | https://www.npmjs.com/package/redux                 |
| redux-devtool         | https://www.npmjs.com/package/redux-devtools        |
| redux-thunk           | https://www.npmjs.com/package/redux-thunk           |

## Redux Structure

For the redux we use the **Ducks** Structure to have everything (reducers, types, actions) in the same file and be optimize
[Ducks](https://github.com/erikras/ducks-modular-redux)

## Repo structure

```
/
├─ src/
│  ├─ assets/            # Assets
│  │  ├─ css/            # General Styles
│  │  ├─ fonts/          # Fonts used in this project
│  ├─ components/        # Components
│  │  ├─ Modal/          # Custom modal component
│  │  ├─ Sidebar/        # Custom sidebar
│  │  ├─ Todos/          # Component that render the todo list
│  │  ├─ CRUDModal       # Component for a crud todo
│  │
|  ├─ doc/               # Project operation user manual
|  |
│  ├─ hooks/             # Custom hooks
│  │  ├─ useModal/       # Custom hook for the modals
│  │  └─ …               # Documentation files
│  ├─ redux/             # Redux folder
│  │  ├─ store           # Store for redux
│  │  ├─ generalDucks    # Duck for the general variables (sidebar interaction)
│  │  ├─ todoDucks       # Duck for all the functionality of the TODO (endpoints)
|  |
|  |
├─ App                   # Main render component
├─ index.css             # Styles for the body html
│
├─ index.js              # Main render functionality
├─ .gitignore            # List of files and folders not tracked by Git
├─ .eslintrc             # Linting preferences for JavasScript
├─ LICENSE               # License information for this project
├─ package.json          # Project manifest
└─ README.md             # This file
```

## Reusable Components

### Modal

Files:

- Modal.jsx
- Modal.css

This component works as a floating Modal.

This Modal receives the following props and works as a component to which the desired structure can be given, thanks to the [children prop](https://codeburst.io/a-quick-intro-to-reacts-props-children-cb3d2fce4891)
Also this modal use a custom hook.

```javascript
  const [isOpenModal, openModal, closeModal] = useModal(); // custom hook
  PROPS
  title //Is the title that display in the top of the modal
  isOpen // Boolean prop that determinate if the modal will be open o hide
  closeModal // Function prop that hide the modal
  Example
<Modal
        title='Attention!'
        isOpen={isOpenDeleteModal}
        closeModal={closeDeleteModal}
      >
        JSX STRUCTURE HERE // Structure that receive the children prop to render custom jsx or html
        </div>
      </Modal>

```

## License

The project uses a license of type [ISC](https://opensource.org/licenses/ISC)

## Author

[Alberto Ochoa](https://www.linkedin.com/in/alberto-ochoa-de-la-torre-340410171/)

## Additional Comments

No other page was added to see the details of the TODO.
This because the modal could be reused to edit the TODO and the details were already painted in the sidebar of the design, so I did not see optimal create another component to see these details, therefore the router was not used since everything was rendered on the same page.
