
/**
 * This class is in charge of handling the interaction with the AR experience through the EmbedSDK.
 */
class OxExperience {
    /**
     * Elements of the AR experience
     */
    items = [
        {
            oid: 'ffa327b98a1143a687f470f120ddc73e',
            name: 'item_1',
            label: 'Nike Revolution 6',
            added: false 
        },
        {
            oid: 'e5b46ce133304f31ac16817927a1e325',
            name: 'item_2',
            label: 'Adidas Runfalcon',
            added: false
        }
    ];

    /**
     * Constructor
     * Initialize the embedSDK
     * 
     * @param   embedsdk allows you to lister to events and control the scene content
     */
    constructor(embedSDK) {
        this.embedSDK = embedSDK;
    }

    /**
     * Get an element based on the index
     * 
     * @param   index of the element
     * @return  an element
     */
    getItem(index) {
        return this.items[index];
    }

    /**
     * Disable one elemento
     * 
     * @param   identifier of the element
     */
    disable(oid) {
        this.embedSDK.disable(oid);
    }

    /**
     * Enable one element
     * 
     * @param   identifier of the element
     */
    enable(oid) {
        this.embedSDK.enable(oid);
    }

    /**
     * Get the number of elements
     * 
     * @return  number of elements
     */
    getSize() {
        return this.items.length;
    }

    /**
     * Update the added property of an element
     * 
     * @param   index of the element
     */
    changeAdded(index) {
        this.items[index].added = !this.items[index].added;
    }

    /**
     * Get all added items
     * 
     * @return  number of added items
     */
    getAddedItems() {
        return this.items.filter(item => item.added).length;
    }
}

/**
 * This class is in charge of handling the interaction with the custom html and css code.
 */
class OxExperienceUI {

    /**
     * HTML elements ids
     */
    PREVIOUS_BUTTON = "#trainars-previous";
    NEXT_BUTTON = "#trainars-next";
    ADD_BUTTON = "#trainars-add-item";
    ADDED_BUTTON = "#trainars-added";
    CONTROLS = "#trainars-controls";
    CONTROLS_NAME = ".trainars-controls__name";
    HEADER = "#trainars-header";
    HEADER_SPAN = ".trainars-header__bag span";

    /**
     * Name of a class
     */
    HIDDEN = "hidden";

    /**
     * Index of the element selected
     */
    currentIndex = 0;

    /**
     * Add actions to the UI
     */
    initUI() {
        document.querySelector(this.PREVIOUS_BUTTON).addEventListener('click', () => this.getItem(embedSDK, false));

        document.querySelector(this.NEXT_BUTTON).addEventListener('click', () => this.getItem(embedSDK, true));

        document.querySelector(this.ADD_BUTTON).addEventListener('click', () => this.toggleItem());

        document.querySelector(this.ADDED_BUTTON).addEventListener('click', () => this.toggleItem());
    }

    /**
     * Get the index of the current element
     * 
     * @return  index of the element
     */
    getCurrentIndex() {
        return this.currentIndex;
    }

    /**
     * Shows the current element
     * 
     * @internal
     * @param   the arrow clicked
     */
    getItem(direction) {
        let currentItem = this.onGetItem(this.currentIndex);
        this.onDisable(currentItem.oid);
        const size = this.onGetSize()
        this.currentIndex += direction ? 1 : -1;
        if (this.currentIndex >= size) {
            this.currentIndex = 0;
        } else if (this.currentIndex < 0) {
            this.currentIndex = size - 1;
        }

        currentItem = this.onGetItem(this.currentIndex);
        this.onEnable(currentItem.oid);
        this.changeName(currentItem);
        this.checkAdded(currentItem);
    }

    /**
     * Add or delete an element from the bag and update the number of added items
     * 
     * @internal
     */
    toggleItem() {
        this.onChangeAdded(this.currentIndex);
        this.checkAdded(this.onGetItem(this.currentIndex));

        const bag = document.querySelector(this.HEADER_SPAN);
        const addedItems = this.onGetAddedItems();
        bag.textContent = addedItems ? addedItems : '';
    }

    /**
     * Check if an element is added and update the bag title
     * 
     * @param   item to add or no
     */
    checkAdded(item) {
        const add = document.querySelector(this.ADD_BUTTON);
        const added = document.querySelector(this.ADDED_BUTTON);
        if (item.added) {
            added.classList.remove(this.HIDDEN);
            add.classList.add(this.HIDDEN);
        } else {
            added.classList.add(this.HIDDEN);
            add.classList.remove(this.HIDDEN);
        }
    }

    /**
     * Update the name of the element in the UI
     * 
     * @param element data
     */
    changeName(currentItem) {
        const name = document.querySelector(this.CONTROLS_NAME);
        name.innerText = currentItem.label;
    }

    /**
     * Enable or diabled the view of the controls and the header
     */
    changeScreen() {
        const toggleHide = (id) => document.querySelector(id).classList.toggle(this.HIDDEN); 
        toggleHide(this.HEADER);
        toggleHide(this.CONTROLS);
    }
}

/**
 * Onirix Embed SDK allows you to listen to events and control the scene when embedding experiences in a custom domain or from the online code editor.
 * For more information visit https://docs.onirix.com/onirix-sdk/embed-sdk
 */

import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@1.2.3/dist/ox-embed-sdk.esm.js";
const embedSDK = new OnirixEmbedSDK();
await embedSDK.connect();
const oxExperience = new OxExperience(embedSDK);
const oxExperienceUi = new OxExperienceUI();

    /**
     * Comunicates oxExperienceUi and oxExperience to get an element
     * 
     * @param   index of the element
     * @return  the element
     */
    oxExperienceUi.onGetItem = (index) => {
        return oxExperience.getItem(index);
    }

    /**
     * Comunicates oxExperienceUi and oxExperience to get the number of elements
     * 
     * @return  numbre of elements
     */
    oxExperienceUi.onGetSize = () => {
        return oxExperience.getSize();
    }

    /**
     * Comunicates oxExperienceUi and oxExperience to disable an element
     * 
     * @param identifier of the element
     */
    oxExperienceUi.onDisable = (oid) => {
        oxExperience.disable(oid);
    }

    /**
     * Comunicates oxExperienceUi and oxExperience to enable an element
     * 
     * @param identifier of the element
     */
    oxExperienceUi.onEnable = (oid) => {
        oxExperience.enable(oid);
    }

    /**
     * Comunicates oxExperienceUi and oxExperience to change the added elements
     * 
     * @param index of the element
     */
    oxExperienceUi.onChangeAdded = (index) => {
        oxExperience.changeAdded(index);
    }

    /**
     * Comunicates oxExperienceUi and oxExperience to gel all added elements
     * 
     * @return number of added elements
     */
    oxExperienceUi.onGetAddedItems = () => {
        return oxExperience.getAddedItems();
    }

    /**
     * It's execute when the scene is totally load and it start the game
     */
    embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, (params) => {
        oxExperienceUi.initUI();
        oxExperienceUi.changeName(oxExperience.getItem(oxExperienceUi.getCurrentIndex()));
        oxExperienceUi.checkAdded(oxExperience.getItem(oxExperienceUi.getCurrentIndex()));
        oxExperienceUi.changeScreen();
    });

    /**
     * Will be triggered when you lose sight of the image and the scene is removed
     */
    embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOST, (params) => {
        oxExperienceUi.changeScreen();
    });