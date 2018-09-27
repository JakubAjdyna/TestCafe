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
