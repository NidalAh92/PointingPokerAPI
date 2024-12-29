import { HubConnectionBuilder } from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7267/pointingPokerHub")
    .withAutomaticReconnect()
    .build();

export default connection;