let debug = false;
const envirement = () => debug ? {
        rutes: {
        back: 'http://localhost:44388/',
        },
        controllers: {
            login: 'Login/',
            diary: 'Diary/',
            patient: 'Patient/',
            historyappoiment: 'HistoryAppoiment/',
            payments: 'Payments/',
            reports: 'Reports/',
            inventory: 'Inventory/',
            waitinglist: 'WaitingList/',
        },
        Assets: {
            multimediaStoreAudio: '/Content/Songs/WaitingList/' 
        }
}
:
{
    rutes: {
        back: 'http://172.16.101.214/',
    },
    controllers: {
        login: 'Login/',
        diary: 'Diary/',
        patient: 'Patient/',
        historyappoiment: 'HistoryAppoiment/',
        payments: 'Payments/',
        reports: 'Reports/',
        inventory: 'Inventory/',
        waitinglist: 'WaitingList/',
    },
    Assets: {
        multimediaStoreAudio: '/Content/Songs/WaitingList/' 
    }
}