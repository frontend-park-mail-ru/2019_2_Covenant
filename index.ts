import Application from 'base/application/Application';
import Node from 'components/Node';
import Header from 'components/Header/Header';
import WebAudioPlayerImpl from 'base/audioplayer/implementations/AudioPlayerImpl';

const app = Application.instance;

const node = new Header();
Object.defineProperty(window, 'node', {value: node});
Object.defineProperty(window, 'app', {value: app});
Object.defineProperty(window, 'Application', {value: Application});

const player = new WebAudioPlayerImpl();
Object.defineProperty(window, 'player', {value: player});

async function load(url: string) {
    let response = await fetch(url);

    let blob = await response.blob();
    console.log(blob);
    // player.set(blob);

    // let reader = response.body.getReader();

    // const contentLength = +response.headers.get('Content-Length');

    // let receivedLength = 0; // количество байт, полученных на данный момент
    // let chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)
    // let blob: Blob;
    // let first = true;

    // while(true) {
    //     const {done, value} = await reader.read();
        
    //     if (done) {
    //         break;
    //     }

        
    //     if (first) {
    //         blob = new Blob([value], {type: "audio/x-wav"});
    //         player.set(blob);
    //     } else {
    //         first = false;
    //         let newBlob = new Blob([value]);
    //         blob = new Blob([blob, newBlob], {type: "audio/x-wav"});
    //         player.set(blob);
    //     }

    //     chunks.push(value);
    //     receivedLength += value.length;

    //     console.log(`Получено ${receivedLength} из ${contentLength}`);

    //     console.log(blob);
    // }

    // console.log(blob);

    // // blob = new Blob(chunks, {type: "audio/x-wav"});
    

};

Object.defineProperty(window, 'load', {value: load});
load('music-waves.wav');

let ms = new MediaSource();
let url = URL.createObjectURL(ms);
let aud = new Audio(url);
aud.src = url;

ms.onsourceopen = () => {
    let buf = ms.addSourceBuffer('audio/mpeg');

    async function loadMs(url: string) {
        let response = await fetch(url);
        let reader = response.body.getReader();

        let receivedLength = 0;
        const contentLength = +response.headers.get('Content-Length');
        let chunks = new Array<Uint8Array>();
        let busy = false;

        buf.onupdateend = () => {
            if (chunks.length) {
                buf.appendBuffer(chunks.shift());
            } else {
                busy = false;
            }
        }

        while(true) {
            const {done, value} = await reader.read();
                
            if (done) {
                break;
            }

            chunks.push(value);
            if (!busy) {
                buf.appendBuffer(chunks.shift());
                busy = true;
            }
        
            receivedLength += value.length;
        
            console.log(`Получено ${receivedLength} из ${contentLength}`);
        }

        // let buffer = await response.arrayBuffer();
        // buf.appendBuffer(buffer);
    }

    // loadMs('flute.mp3');
}
Object.defineProperty(window, 'aud', {value: aud});
Object.defineProperty(window, 'ms', {value: ms});