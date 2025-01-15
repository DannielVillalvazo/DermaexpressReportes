let debug = true;
const envirement = () => debug ? {
    rutes: {
        back: '/',
    },
    controllers: {
        login: 'Login/',
        home: 'Home/',

    },
    Assets: {
        multimediaStoreAudio: '/Content/Songs/WaitingList/'
    }
}
    :
    {
        rutes: {
            back: '/',
        },
        controllers: {
            login: 'Login/',
            home: 'Home/',
        },
        Assets: {
            multimediaStoreAudio: '/Content/Songs/WaitingList/'
        }



    }




