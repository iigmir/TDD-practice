const assert = require('assert');

function ATM()
{   // Code
    this.deposit = (amount , value) =>
    {
        if ( value > 0 ) { return amount + value; }
        return amount;
    }

    this.withdraw = (amount , value) =>
    {
        if ( value > 0 && amount > value )
        {
            return amount - value;
        }
        return amount;
    }
}


describe('ATM', function()
{
    describe('Deposit', function()
    {
        it('原本帳戶有 10 元，存入 5 元之後，帳戶餘額變 15 元', function()
        {
            let amount = 10;
            let atm = new ATM();
            assert.equal( 15 , atm.deposit( 10 , 5 ) );
        });

        it('原本帳戶有 10 元，存入 -5 元之後，帳戶餘額還是 10 元（不能存入小於等於零的金額）', function()
        {
            let amount = 10;
            let atm = new ATM();
            assert.equal( 10 , atm.deposit( 10 , -5 ) );
        });
    });

    describe('Withdraw', function()
    {
        it('原本帳戶有 10 元，領出 5 元之後，帳戶餘額變 5 元', function()
        {
            let amount = 10;
            let atm = new ATM();
            assert.equal( 5 , atm.withdraw( 10 , 5 ) );
        });
        it('原本帳戶有 10 元，試圖領出 20 元，帳戶餘額還是 10 元，但無法領出（餘額不足）', function()
        {
            let amount = 10;
            let atm = new ATM();
            assert.equal( 10 , atm.withdraw( 10 , 20 ) );
        });
        it('原本帳戶有 10 元，領出 -5 元之後，帳戶餘額還是 10 元（不能領出小於或等於零的金額）', function()
        {
            let amount = 10;
            let atm = new ATM();
            assert.equal( 10 , atm.withdraw( 10 , -5 ) );
        });
    });
});