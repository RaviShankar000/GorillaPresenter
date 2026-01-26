HomePlugin = {
     renderHTML: async function (directive) {
        const iconSpec = "ionicons/home.svg";
        let iconExists = await fs.fileExists(iconSpec);
        if (iconExists) {
            let iconData = await fs.readTextFile(iconSpec);
            iconData = iconData.replace(/<svg /, `<svg title="Home" aria-label="Home" `);
            return `<span class="ionicon homebutton" onClick='GorillaPresenter.showSlide(0, \"swipeInFromLeft\");'>${iconData}</span>`;
        }
        else {
            console.warn("Icon file not found for directive: " + directive);
            return `<span class="gorilla-media-missing">[Missing icon: ${directive}]</span>`;
        }
    }
}