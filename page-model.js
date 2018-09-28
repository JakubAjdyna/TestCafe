import { Selector } from 'testcafe';

class Example {
    constructor (text) {
        this.label = label.withText(text)
    }
}

export default class Page {
    constructor () {
        this.basicAuth = Selector('#content').find('a').withText('Basic Auth');
        this.congrats = Selector('#content').find('div').find('p');

        this.brokenImages = Selector('#content').find('a').withText('Broken Images');
        this.image1 = Selector('#content > div > img:nth-child(2)');
        this.image2 = Selector('#content > div > img:nth-child(3)');
        this.image3 = Selector('#content > div > img:nth-child(4)');

        this.checkboxes = Selector('#content').find('a').withText('Checkboxes');
        this.checkbox1 = Selector('#checkboxes > input[type="checkbox"]:nth-child(1)');
        this.checkbox2 = Selector('#checkboxes > input[type="checkbox"]:nth-child(3)');

        this.dragAndDrop = Selector('#content').find('a').withText('Drag and Drop')
        this.columnHeader = Selector('#column-a > header');

        this.dropdown = Selector('#content').find('a').withText('Dropdown');
        this.dropdownSelect = Selector('#dropdown');
        this.dropdownOption = this.dropdownSelect.find('option');

        this.dynamicControls = Selector('#content').find('a').withText('Dynamic Controls');
        this.dynCheckbox = Selector('#checkbox');
        this.removeCheckbox = Selector('#checkbox-example > button');
        this.itsGone = Selector('#checkbox-example').find('p').withText("It's gone!");
        this.dynField = Selector('#input-example > input[type="text"]');
        this.removeField = Selector('#input-example > button');
        this.itsEnabled = Selector('#input-example').find('p').withText("It's enabled!");

        this.dynamicLoading = Selector('#content').find('a').withText('Dynamic Loading');
        this.example1 = Selector('#content').find('a').withText('Example 1');
        this.example2 = Selector('#content').find('a').withText('Example 2');
        this.start = Selector('#start > button');
        this.finish = Selector('#finish');

        this.exitIntent = Selector('#content').find('a').withText('Exit Intent');
        this.hoverTitle = Selector('#content').find('h3').withText('Exit Intent');
        this.modal = Selector('#ouibounce-modal');
        this.modalClose = this.modal.find('p').withText('Close');

        this.fileDownloader = Selector('#content').find('a').withText('File Download');
        this.emptyTxt = Selector('#content > div > a:nth-child(8)');

        this.fileUploader = Selector('#content').find('a').withText('File Upload');
        this.chooseFiles = Selector('#file-upload');
        this.uploadFiles = Selector('#file-submit');
        this.uploadedFiles = Selector('#uploaded-files');

        this.floatingMenu = Selector('#content').find('a').withText('Floating Menu');
        this.floatingHomeButton = Selector('#menu').find('a').withText('Home');
        this.floatingText = Selector('#content > div > div.row > div > p:nth-child(10)');

        this.forgotPassword = Selector('#content').find('a').withText('Forgot Password');
        this.emailField = Selector('#email');
        this.retrievePasswordButton = Selector('#form_submit');
        this.emailSent = Selector('#content');

        this.formAuthentication = Selector('#content').find('a').withText('Form Authentication');
        this.username = Selector('#username');
        this.password = Selector('#password')
        this.loginButton = Selector('#login').find('button').withText('Login');
        this.logoutButton = Selector('#content').find('i').withText('Logout');
        this.flash = Selector('#flash');
        this.flashClose = Selector('#flash').find('a');

        this.hovers = Selector('#content').find('a').withText('Hovers');
        this.pic = Selector('#content > div > div:nth-child(3)');
        this.picHover = Selector('#content > div > div:nth-child(3) > div');

        this.infiniteScroll = Selector('#content').find('a').withText('Infinite Scroll');
        this.scrollInner = Selector('#content > div > div > div > div');
        this.scrollElements = Selector('#content > div > div > div > div > div');
    }
}