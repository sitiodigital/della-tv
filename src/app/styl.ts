import styled from 'styled-components';
export const Container = styled.section`
    background-color: var(--bg);
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 16px;
    color: var(--gray);
    overflow: hidden;
    display: flex;
    margin: 0;
    padding: 0;
    display: grid;
    flex: 1;
    width: 100vw;
    height: 100vh;
    grid-template-columns: 75vw 25vw;

    .carrossel {
        cursor: pointer;
        display: flex;
        background: #000;
    }
    .logo {
        display: flex;
        justify-items: center;
        height: 15vh;
    }
    .transition {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .transition .container {
        position: relative;
        height: 100%;
    }
    .transition img {
        position: absolute;
    }
    .hour {
        display: flex;
        align-items: center;
    }
    .hour p {
        font-size: 2.2rem;
        color: var(--brown);
    }
    section.guiche {
        background-color: var(--white);
        border-top: 15px solid var(--gold);
        border-bottom: 15px solid var(--gold);
        display: grid;
        grid-template-rows: 25vh 1fr 13vh;
    }
    .warp-guiche {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    header {
        background-color: var(--brown);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    img {
        width: 100%;
        max-width: 100%;
        height: auto;
        object-fit: cover;
    }

    footer {
        border-top: 10px solid var(--bg);
        display: flex;
        align-items: center;
    }
    footer img {
        padding: 10px 20px 10px 20px;
        width: 70px;
    }
    footer p {
        color: var(--text-cor);
    }
    h1 {
        color: var(--chamar);
        font-size: 28rem;
        font-weight: bold;
    }
    h2 {
        color: var(--gold);
        font-size: 3rem;
    }
    h3 {
        color: var(--green);
        font-size: 1.45rem;
    }
    h4 {
        color: white;
        font-size: 4rem;
    }

    .fade-enter {
        opacity: 0;
    }
    .fade-exit {
        opacity: 1;
    }
    .fade-enter-active {
        opacity: 1;
    }
    .fade-exit-active {
        opacity: 0;
    }
    .fade-enter-active,
    .fade-exit-active {
        transition: opacity 800ms;
    }

    .shake-enter {
        opacity: 0;
        transform: scale(0.9);
    }
    .shake-exit {
        opacity: 1;
    }
    .shake-enter-active {
        opacity: 1;
        transition: opacity 300ms, transform 300ms;
    }
    .shake-exit-active {
        opacity: 0;
    }
    .shake-enter-active,
    .shake-exit-active {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 300ms, transform 300ms;
    }
    .zoom-enter {
        opacity: 0.5;
        transform: scale(1.2);
        transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .zoom-enter-active {
        opacity: 1;
        transform: scale(1);
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .zoom-exit {
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .zoom-exit-active {
        opacity: 1;
        transform: sale(1);
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
`;
