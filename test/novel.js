const assert = require('assert');

function Novel( current_chapter )
{   // Code
    this.add = () =>
    {
        let tmp_ary = current_chapter.sort( (x,y) => x - y );
        let new_array = Array.from(tmp_ary);
        let tmp_num = tmp_ary[ tmp_ary.length - 1 ] + 1;
        
        new_array.push( tmp_num );
        return new_array;
    }

    this.remove = ( given_number ) =>
    {
        let tmp_ary = current_chapter.sort( (x,y) => x - y );
        let new_array = Array.from(tmp_ary);
        let index_of_new_array = [];

        if ( Array.isArray( given_number ) )
        {
            given_number.forEach( (e) =>
            {
                if( new_array.indexOf(e) > -1 )
                {   // There's bug that will "splice" elems 
                    // even when given_number in array is not exist
                    // so we need to detect that given_number has positison in array
                    // That is, indexOf is not -1
                    new_array.splice( new_array.indexOf(e) , 1 );
                }
            });
        }
        else
        {
            if( new_array.indexOf(given_number) > -1 )
            {   // ...So do when given_number is not array 
                new_array.splice( new_array.indexOf(given_number) , 1 );
            }
        }
        return new_array;
    }
}


describe('Novel', function()
{
    describe('Add', function()
    {
        it('Should add chapter at last chapter when adding', function()
        {
            let novel = new Novel([1,2,3,4,5,6,7,8,9,10]);
            assert.deepEqual( [1,2,3,4,5,6,7,8,9,10,11] , novel.add() );
        });

        it('Should not add chapter at missing chapter when adding', function()
        {
            let novel1 = new Novel([1,2,3,4,8,9,10]);
            let novel2 = new Novel([123,4,56,78,9,0]);
            assert.deepEqual( [1,2,3,4,8,9,10,11] , novel1.add() );
            assert.deepEqual( [0,4,9,56,78,123,124] , novel2.add() );
        });
    });

    describe('Remove', function()
    {
        it('Should remove chapter(s) that user choosed', function()
        {
            let novel1 = new Novel([1,2,3,4,5,6]);
            let novel2 = new Novel([2,3,4,6,8,9]);
            let novel3 = new Novel([1,2,3,4,5,6]);
            assert.deepEqual( [1,2,3,4,5] , novel1.remove(6) );
            assert.deepEqual( [2,4,6,8,9] , novel2.remove(3) );
            assert.deepEqual( [1,3,4, 5 ] , novel3.remove([2,6]) );
        });
        it('Should refresh chapter numbers after remove', function()
        {
            let novel1 = new Novel([3,9,16,2]);
            let novel2 = new Novel([40,1356,12,7]);
            assert.deepEqual( [2,3,16] , novel1.remove(9) );
            assert.deepEqual( [7,12,40] , novel2.remove(1356) );
        });
        it('Should remain same chapter if user choosed invaild chapter', function()
        {
            let novel1 = new Novel([1,2,3,4,5,6]);
            let novel2 = new Novel([2,3,4,6,8,9]);
            let novel3 = new Novel([1,2,3,4,5,6]);
            let novel4 = new Novel([3,9,16,2]);
            let novel5 = new Novel([40,1356,12,7]);
            assert.deepEqual( [1,2,3,4,5,6] , novel1.remove(9) );
            assert.deepEqual( [2,3,4,6,8,9] , novel2.remove(16) );
            assert.deepEqual( [1,2,3,4,5,6] , novel3.remove([94,13]) );
            assert.deepEqual( [2,3,9,16] , novel4.remove([22]) );
            assert.deepEqual( [7,12,40,1356] , novel5.remove([1024,6]) );
        });
    });
});