const inputs = document.querySelectorAll('input');

inputs.forEach((input) => {
    const placeholder = input.placeholder;

    input.addEventListener('focus', () => {
        input.placeholder="";
    });
    input.addEventListener('blur', () => {
        input.placeholder=placeholder;
    });
})