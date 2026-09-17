function isPositiveInteger(val) {
    return /^\d+$/.test(val.trim());
}

$(document).ready(function() {
    $('#calc-form').submit(function(e) {
        e.preventDefault();

        const leftVal = $('#left').val();
        const rightVal = $('#right').val();

        if (!isPositiveInteger(leftVal) || !isPositiveInteger(rightVal)) {
            alert('Error :(');
            return;
        }

        const num1 = parseInt(leftVal, 10);
        const num2 = parseInt(rightVal, 10);
        const op = $('#operator').val();

        if ((op === '/' || op === '%') && num2 === 0) {
            alert("It's over 9000!");
            console.log("It's over 9000!");
            return;
        }

        let result;
        switch (op) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num1 / num2; break;
            case '%': result = num1 % num2; break;
        }

        alert(result);
        console.log(result);
    });

    setInterval(function() {
        alert('Please, use me...');
    }, 30000);
});
