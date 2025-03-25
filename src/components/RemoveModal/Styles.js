import styled from "styled-components";

export const ModelContainer = styled.footer`
    text-align: center;
    font-weight: bold;
    background-color: #eeeeee;
    border: solid 3px gold;
    border-radius: 18px;
    position: fixed;
    top: 40%;
    left: 50%;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    transform: translate(-50%, -50%);
    padding: 20px;
    min-width: 260px;
    min-height: 125px;
    flex-direction: column;
`

export const Message = styled.p`
    color: Black;
    font-family: 'Orbitron', sans-serif;
    float: left;
    margin: 0;
    font-size: 1.5em;
`;

export const CloseX = styled.p`
    color: black;
    font-family: 'Orbitron', sans-serif;
    float: right;
    margin: 0;
    position: fixed;
    top: 2%;
    left: 90%;
    font-size: 2em;
    cursor: pointer;
`;

export const YesBtn = styled.button`
    cursor: pointer;
    border-radius: 12px;
    min-width: 90px;
    margin-top: 1.5em;
    font-size: 1.5em;
`;