import '@testing-library/jest-dom';
import {fetch} from 'whatwg-fetch';

if (!global.fetch) {
    global.fetch = fetch;
}
