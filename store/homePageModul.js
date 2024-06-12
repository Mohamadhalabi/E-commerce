//state
export const state = () => ({
    modulState: {
        value: true
    },
})

//getters
export const getters = {
    getIsVisited: (state) => {
        return state.isVisited.value;
    }
}

//actions
export const actions = {
    // showModul: async function ({ commit, state }, payload) {
    //     localStorage.getItem('moduleStateTest');
    //     let x = localStorage.getItem('moduleStateTest') ? true : false
    //     if (localStorage.getItem('tokenEnded') == 1) {
    //         if (payload.$route.path === "/" && x == false) {
    //             setTimeout(() => {
    //                 payload.$modal.show(
    //                     () => import("~/components/home/PvNewsletterModal"),
    //                     {},
    //                     {
    //                         width: "400",
    //                         height: "auto",
    //                         adaptive: true,
    //                         class: "newsletter-modal",
    //                     }
    //                 );
    //                 localStorage.setItem('moduleStateTest', 'false')
    //
    //             }, 5000)
    //         }
    //
    //     }
    // }
}


//mutaitions
export const mutations = {
    UPDATE_STATE: function (state) {
        state.modulState = false;
    }
}

