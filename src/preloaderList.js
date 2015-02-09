'use strict';

var PreloaderList = function ()
{
    if (!(this instanceof PreloaderList))
    {
        return new PreloaderList();
    }

    var me = this;

    var FILE_INDEX_PATTERN = '<number>';
    var FILE_INDEX_NUMBER_OF_DIGITS = 2;
    var FILE_NAME_PATTERN = FILE_INDEX_PATTERN + '.png';
    var BASEPATH = 'assets/images/';

    var additionalFiles = [
        {src:BASEPATH+'background/00.png', groupName:'various', name:'faceBackground'}
    ];

    var OPTIONS = [
        {
            groupName: 'chin',
            directory: BASEPATH + 'chin/',
            listSize: 65,
            exclusions: [13,30,36,37,48,61,62]
        },
        {
            groupName: 'nose',
            directory: BASEPATH + 'nose/',
            listSize: 65,
            exclusions: [13,30,36,37,48,61,62]
        },
        {
            groupName: 'mouth',
            directory: BASEPATH + 'mouth/',
            listSize: 65,
            exclusions: [13,30,36,37,48,61,62]
        },
        {
            groupName: 'lefteye',
            directory: BASEPATH + 'lefteye/',
            listSize: 65,
            exclusions: [13,30,36,37,48,61,62]
        },
        {
            groupName: 'righteye',
            directory: BASEPATH + 'righteye/',
            listSize: 65,
            exclusions: [13,30,36,37,48,61,62]
        }
    ];

    me.create = function create() {

        var list = [];

        list = list.concat(additionalFiles);

        for(var i = 0; i < OPTIONS.length; i++) {

            list = list.concat(createListItems(OPTIONS[i]));
        }

        return list;
    };

    function createListItems(options) {

        var list = [];

        for(var i = 0; i < options.listSize; i++) {

            if(!isExcluded(i, options.exclusions)) {

                var src = options.directory + createFileName(i);

                list.push({groupName:options.groupName, src:src});
            }
        }

        return list;
    }

    function createFileName(index) {

        return FILE_NAME_PATTERN.replace(FILE_INDEX_PATTERN, addLeadingZeros(index));
    }

    function addLeadingZeros(n) {

        var str = n.toString();

        while(str.length < FILE_INDEX_NUMBER_OF_DIGITS) {
            str = '0' + str;
        }

        return str;
    }

    function isExcluded(index, exclusions) {

        var excluded = false;

        for(var i = 0; i < exclusions.length; i++) {

            if(index === exclusions[i]) {
                excluded = true;
                break;
            }
        }

        return excluded;
    }

    return this;
}

module.exports = PreloaderList;