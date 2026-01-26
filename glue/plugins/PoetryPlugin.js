PoetryPlugin = {
    renderHTML: async function (arg) {
        return arg.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;')
    },
    };