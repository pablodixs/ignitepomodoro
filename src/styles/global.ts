import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    :focus {
        outline: none;
        box-shadow: 0 0 0 2px ${(props) => props.theme['green-700']};
    }

    body {
        background-color: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme['gray-300']};
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
    }
`
