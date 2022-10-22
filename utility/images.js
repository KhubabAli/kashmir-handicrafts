import {Buffer} from "buffer";

export default function binaryToBase64(binary) {
    return 'data:image/jpeg;base64,' +
        Buffer.from(binary).toString('base64')
}



