const url_hzbk = ret => `${FETCH_DOMAIN_HZBK}/app/${ret}`;
const url_lm = ret => `${FETCH_DOMAIN_LM}/app/${ret}`;

const FETCH_DOMAIN_HZBK = 'http://112.13.201.167:8008/hzbk/jky';
const FETCH_DOMAIN_LM = 'http://112.13.201.85:6086';

const FETCH_URL_MAP = {
    login: url_hzbk`login?__login=true&__ajax=json&username=EAF84325DB6114C8E1BC53763CDA3C3FCAFFBB09984C96A9&password=A1EAF07BB51B073BB923BD5BEB1AC8F8`,
    getTokenUser: url_lm`getTokenUser`
};

export {
    FETCH_DOMAIN_LM,
    FETCH_URL_MAP
};