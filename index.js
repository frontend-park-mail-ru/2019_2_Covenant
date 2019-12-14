import { AudioPlayer, Looping } from './audio-system/audioplayer';

let player = new AudioPlayer(Looping.queue);

Object.defineProperty(window, 'player', {value: player});
player.setPlaylist([
    {url: '/Users/jason/Desktop/Dead by April - Incomparable 2011/01 - Dreaming.mp3'},
    {url: '/Users/jason/Desktop/Dead by April - Incomparable 2011/02 - Real & True.mp3'},
    {url: '/Users/jason/Desktop/Dead by April - Incomparable 2011/03 - Within My Heart.mp3'},
    {url: '/Users/jason/Desktop/Dead by April - Incomparable 2011/04 - More Than Yesterday.mp3'},
    {url: '/Users/jason/Desktop/Dead by April - Incomparable 2011/05 - Calling.mp3'},
    {url: '/Users/jason/Desktop/Dead by April - Incomparable 2011/06 - Two Faced.mp3'},
    {url: '/Users/jason/Desktop/Dead by April - Incomparable 2011/07 - Crossroads.mp3'},
    {url: '/Users/jason/Desktop/Dead by April - Incomparable 2011/08 - Incomparable.mp3'},
    {url: '/Users/jason/Desktop/Dead by April - Incomparable 2011/09 - Too Late.mp3'},
    {url: '/Users/jason/Desktop/Dead by April - Incomparable 2011/10 - You Should Know.mp3'},
    {url: '/Users/jason/Desktop/Dead by April - Incomparable 2011/11 - When You Wake Up.mp3'},
    {url: '/Users/jason/Desktop/Dead by April - Incomparable 2011/12 - Lost.mp3'},
    {url: '/Users/jason/Desktop/Dead by April - Incomparable 2011/13 - Last Goodbye.mp3'},
], 0);