import Page from './page-model';

const page = new Page();


fixture `Herokuapp`
    .page `http://the-internet.herokuapp.com/`
    .httpAuth({
        username: 'admin',
        password: 'admin'        
    });


test('Basic auth', async t => {
    await t
        .click(page.basicAuth)
        .expect(page.congrats.innerText).contains('Congratulations!');
});

test('Broken Images', async t => {
    await t
        .click(page.brokenImages)
        .expect(page.image1.exists).ok()
        .expect(page.image2.exists).ok()
        .expect(page.image3.exists).ok();
});

test('Checkboxes', async t => {
    await t
        .click(page.checkboxes)
        .click(page.checkbox1)
        .click(page.checkbox2)
        .expect(page.checkbox1.checked).ok()
        .expect(page.checkbox2.checked).notOk();
});

test('Drag and Drop', async t => {
    await t
        .click(page.dragAndDrop)
        .dragToElement('#column-a','#column-b')
        .expect(page.columnHeader.innerText).contains('B');
});

test('Dropdown', async t => {
    await t
        .click(page.dropdown)
        .click(page.dropdownSelect)
        .click(page.dropdownOption.withText('Option 1'))
        .expect(page.dropdownSelect.value).eql('1')
        .click(page.dropdownSelect)
        .click(page.dropdownOption.withText('Option 2'))
        .expect(page.dropdownSelect.value).eql('2');
});

test('Dynamic Controls', async t => {
    await t
        .click(page.dynamicControls)
        .expect(page.dynCheckbox.exists).ok()
        .click(page.removeCheckbox)
        .expect(page.itsGone.exists).ok()
        .expect(page.dynCheckbox.exists).notOk()

        .expect(page.dynField.hasAttribute('disabled')).ok()
        .click(page.removeField)
        .expect(page.itsEnabled.exists).ok()
        .typeText(page.dynField,'Test')
        .expect(page.dynField.hasAttribute('disabled')).notOk();
});

test('Dynamic Loading example 1', async t => {
    await t
        .click(page.dynamicLoading)
        .click(page.example1)
        .expect(page.finish.visible).notOk()
        .click(page.start)
        .expect(page.finish.visible).ok({timeout: 5000});
});

test('Dynamic Loading example 2', async t => {
    await t
        .click(page.dynamicLoading)
        .click(page.example2)
        .expect(page.finish.exists).notOk()
        .click(page.start)
        .expect(page.finish.exists).ok({timeout: 5000});
});

test('Exit Intent', async t => {
    await t
        .click(page.exitIntent);
    const fireAction = await t.eval(() => _ouibounce.fire());  
    await t
        .expect(page.modal.visible).ok()
        .click(page.modalClose);
});

test("File Downloader", async (t) => {
    await t
        .click(page.fileDownloader)
        .click(page.emptyTxt);
});

test("File Uploader", async (t) => {
    await t
        .click(page.fileUploader)
        .setFilesToUpload(page.chooseFiles, [
            './upload/empty.txt'
        ])
        .click(page.uploadFiles)
        .expect(page.uploadedFiles.innerText).eql('empty.txt');
});

test("Floating Menu", async (t) => {
    await t
        .click(page.floatingMenu)
        .hover(page.floatingText)
        .click(page.floatingHomeButton);
    const addressHomeButton  = await t.eval(() => document.location.href);
    await t
        .expect(addressHomeButton).contains('home');
});

test("Forgot Password", async (t) => {
    await t
        .click(page.forgotPassword)
        .typeText(page.emailField,'test@email.com')
        .click(page.retrievePasswordButton)
        .expect(page.emailSent.innerText).eql("Your e-mail's been sent!");
});

test("Form Authentication", async (t) => {
    await t
        .click(page.formAuthentication)
        // negative path
        .typeText(page.username,'wronguser')
        .typeText(page.password,'wrongpassword')
        .click(page.loginButton)
        .expect(page.flash.innerText).contains('Your username is invalid!')
        // happy path
        .typeText(page.username,'tomsmith')
        .typeText(page.password,'SuperSecretPassword!')
        .click(page.loginButton)
        .expect(page.flash.innerText).contains('You logged into a secure area!')
        .click(page.logoutButton)
        .expect(page.flash.innerText).contains('You logged out of the secure area!');
});

test("Hovers", async (t) => {
    await t
        .click(page.hovers)
        .expect(page.picHover.getStyleProperty('display')).eql('none')
        .hover(page.pic)
        .expect(page.picHover.getStyleProperty('display')).eql('block');
});

test("Infinite Scroll", async (t) => {
    await t
        .click(page.infiniteScroll);
        for (var i = 0; i < 10; i++){
           await t.hover(page.scrollElements.nth(i), {timeout: 100})};
});

test("JQuery UI Menus", async (t) => {
    await t
    //clicking enabled
        .click(page.jQueryUiMenus)
        .hover(page.jqMenuEnabled)
        .hover(page.jqMenuDownloads)
        .click(page.jqMenuDownloadsPDF)
        .click(page.jqMenuDownloadsCSV)
        .click(page.jqMenuDownloadsExcel)
        .click(page.jqMenuBackToJQueryUI)
        .expect(page.jqTitle.innerText).eql('JQuery UI')
        .click(page.jqBackToMenu)
    //checking disabled
        .hover(page.jqMenuDisabled)
        .expect(page.jqMenuShouldNotSeeThis.visible).notOk();
});

test("JavaScript Alerts", async (t) => {
    await t
        .setNativeDialogHandler((type) => {
            switch (type) {
                case 'alert':
                    return;
                case 'confirm':
                    return true;
                case 'prompt':
                    return 'Test';}})
        .click(page.javascriptAlerts)
        .click(page.jsAlert)
        .expect(page.jsResult.innerText).eql('You successfuly clicked an alert')
        .click(page.jsConfirm)
        .expect(page.jsResult.innerText).eql('You clicked: Ok')
        .click(page.jsPrompt)
        .expect(page.jsResult.innerText).eql('You entered: Test');

});

test("JavaScript onload event error", async (t) => {
    await t
        .click(page.javascriptOnLoadEventError);
        //TestCafe automatically fails the test, if console.error is found
});

test("Key Presses", async (t) => {
    await t
        .click(page.keyPresses);
        for (var i = 0; i < 30; i++){
            var randomChar = Math.random().toString(36).substring(2,3)
            .toUpperCase(randomChar);
            await t
                .pressKey(randomChar)
                .expect(page.keyPressResult.innerText).contains(randomChar);
        }
});

test("Multiple Windows", async (t) => {
    await t
        .click(page.multipleWindows)
        .click(page.openNewWindow)
        .expect(page.newWindowContent.innerText).contains('New Window');
});

test("Notification Messages", async (t) => {
    await t
        .click(page.notificationMessages);
        for (var i = 0; i < 10; i++){
            await t
                .click(page.newMessage)
                .expect(page.flash.innerText).contains('Action');
            }
});
