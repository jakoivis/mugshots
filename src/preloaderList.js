'use strict';

var list = [
    {src:'assets/images/background/00.png', groupName:'various', name:'faceBackground'},

    {src:'assets/images/chin/00.png', groupName:'chin', boundsBottom:'285'},
    {src:'assets/images/chin/01.png', groupName:'chin', boundsBottom:'285'},
    {src:'assets/images/chin/02.png', groupName:'chin', boundsBottom:'290'},
    {src:'assets/images/chin/03.png', groupName:'chin', boundsBottom:'315'},
    {src:'assets/images/chin/04.png', groupName:'chin', boundsBottom:'326'},
    {src:'assets/images/chin/05.png', groupName:'chin', boundsBottom:'357'},
    {src:'assets/images/chin/06.png', groupName:'chin', boundsBottom:'305'},
    {src:'assets/images/chin/07.png', groupName:'chin', boundsBottom:'300'},
    {src:'assets/images/chin/08.png', groupName:'chin', boundsBottom:'353'},
    {src:'assets/images/chin/09.png', groupName:'chin', boundsBottom:'337'},
    {src:'assets/images/chin/10.png', groupName:'chin', boundsBottom:'345'},
    {src:'assets/images/chin/11.png', groupName:'chin', boundsBottom:'328'},
    {src:'assets/images/chin/12.png', groupName:'chin', boundsBottom:'277'},
    {src:'assets/images/chin/14.png', groupName:'chin', boundsBottom:'282'},
    {src:'assets/images/chin/15.png', groupName:'chin', boundsBottom:'315'},
    {src:'assets/images/chin/16.png', groupName:'chin', boundsBottom:'313'},
    {src:'assets/images/chin/17.png', groupName:'chin', boundsBottom:'320'},
    {src:'assets/images/chin/18.png', groupName:'chin', boundsBottom:'360'},
    {src:'assets/images/chin/19.png', groupName:'chin', boundsBottom:'345'},
    {src:'assets/images/chin/20.png', groupName:'chin', boundsBottom:'290'},
    {src:'assets/images/chin/21.png', groupName:'chin', boundsBottom:'300'},
    {src:'assets/images/chin/22.png', groupName:'chin', boundsBottom:'318'},
    {src:'assets/images/chin/23.png', groupName:'chin', boundsBottom:'286'},
    {src:'assets/images/chin/24.png', groupName:'chin', boundsBottom:'344'},
    {src:'assets/images/chin/25.png', groupName:'chin', boundsBottom:'343'},
    {src:'assets/images/chin/26.png', groupName:'chin', boundsBottom:'340'},
    {src:'assets/images/chin/27.png', groupName:'chin', boundsBottom:'308'},
    {src:'assets/images/chin/28.png', groupName:'chin', boundsBottom:'279'},
    {src:'assets/images/chin/29.png', groupName:'chin', boundsBottom:'317'},
    {src:'assets/images/chin/31.png', groupName:'chin', boundsBottom:'351'},
    {src:'assets/images/chin/32.png', groupName:'chin', boundsBottom:'294'},
    {src:'assets/images/chin/33.png', groupName:'chin', boundsBottom:'281'},
    {src:'assets/images/chin/34.png', groupName:'chin', boundsBottom:'278'},
    {src:'assets/images/chin/35.png', groupName:'chin', boundsBottom:'289'},
    {src:'assets/images/chin/38.png', groupName:'chin', boundsBottom:'285'},
    {src:'assets/images/chin/39.png', groupName:'chin', boundsBottom:'311'},
    {src:'assets/images/chin/40.png', groupName:'chin', boundsBottom:'293'},
    {src:'assets/images/chin/41.png', groupName:'chin', boundsBottom:'354'},
    {src:'assets/images/chin/42.png', groupName:'chin', boundsBottom:'325'},
    {src:'assets/images/chin/43.png', groupName:'chin', boundsBottom:'348'},
    {src:'assets/images/chin/44.png', groupName:'chin', boundsBottom:'284'},
    {src:'assets/images/chin/45.png', groupName:'chin', boundsBottom:'334'},
    {src:'assets/images/chin/46.png', groupName:'chin', boundsBottom:'282'},
    {src:'assets/images/chin/47.png', groupName:'chin', boundsBottom:'295'},
    {src:'assets/images/chin/49.png', groupName:'chin', boundsBottom:'342'},
    {src:'assets/images/chin/50.png', groupName:'chin', boundsBottom:'288'},
    {src:'assets/images/chin/51.png', groupName:'chin', boundsBottom:'289'},
    {src:'assets/images/chin/52.png', groupName:'chin', boundsBottom:'274'},
    {src:'assets/images/chin/53.png', groupName:'chin', boundsBottom:'284'},
    {src:'assets/images/chin/54.png', groupName:'chin', boundsBottom:'289'},
    {src:'assets/images/chin/55.png', groupName:'chin', boundsBottom:'307'},
    {src:'assets/images/chin/56.png', groupName:'chin', boundsBottom:'286'},
    {src:'assets/images/chin/57.png', groupName:'chin', boundsBottom:'298'},
    {src:'assets/images/chin/58.png', groupName:'chin', boundsBottom:'271'},
    {src:'assets/images/chin/59.png', groupName:'chin', boundsBottom:'331'},
    {src:'assets/images/chin/60.png', groupName:'chin', boundsBottom:'352'},
    {src:'assets/images/chin/63.png', groupName:'chin', boundsBottom:'304'},
    {src:'assets/images/chin/64.png', groupName:'chin', boundsBottom:'339'},
    {src:'assets/images/chin/65.png', groupName:'chin', boundsBottom:'311'},

    {src:'assets/images/nose/00.png', groupName:'nose'},
    {src:'assets/images/nose/01.png', groupName:'nose'},
    {src:'assets/images/nose/02.png', groupName:'nose'},
    {src:'assets/images/nose/03.png', groupName:'nose'},
    {src:'assets/images/nose/04.png', groupName:'nose'},
    {src:'assets/images/nose/05.png', groupName:'nose'},
    {src:'assets/images/nose/06.png', groupName:'nose'},
    {src:'assets/images/nose/07.png', groupName:'nose'},
    {src:'assets/images/nose/08.png', groupName:'nose'},
    {src:'assets/images/nose/09.png', groupName:'nose'},
    {src:'assets/images/nose/10.png', groupName:'nose'},
    {src:'assets/images/nose/11.png', groupName:'nose'},
    {src:'assets/images/nose/12.png', groupName:'nose'},
    {src:'assets/images/nose/14.png', groupName:'nose'},
    {src:'assets/images/nose/15.png', groupName:'nose'},
    {src:'assets/images/nose/16.png', groupName:'nose'},
    {src:'assets/images/nose/17.png', groupName:'nose'},
    {src:'assets/images/nose/18.png', groupName:'nose'},
    {src:'assets/images/nose/19.png', groupName:'nose'},
    {src:'assets/images/nose/20.png', groupName:'nose'},
    {src:'assets/images/nose/21.png', groupName:'nose'},
    {src:'assets/images/nose/22.png', groupName:'nose'},
    {src:'assets/images/nose/23.png', groupName:'nose'},
    {src:'assets/images/nose/24.png', groupName:'nose'},
    {src:'assets/images/nose/25.png', groupName:'nose'},
    {src:'assets/images/nose/26.png', groupName:'nose'},
    {src:'assets/images/nose/27.png', groupName:'nose'},
    {src:'assets/images/nose/28.png', groupName:'nose'},
    {src:'assets/images/nose/29.png', groupName:'nose'},
    {src:'assets/images/nose/31.png', groupName:'nose'},
    {src:'assets/images/nose/32.png', groupName:'nose'},
    {src:'assets/images/nose/33.png', groupName:'nose'},
    {src:'assets/images/nose/34.png', groupName:'nose'},
    {src:'assets/images/nose/35.png', groupName:'nose'},
    {src:'assets/images/nose/38.png', groupName:'nose'},
    {src:'assets/images/nose/39.png', groupName:'nose'},
    {src:'assets/images/nose/40.png', groupName:'nose'},
    {src:'assets/images/nose/41.png', groupName:'nose'},
    {src:'assets/images/nose/42.png', groupName:'nose'},
    {src:'assets/images/nose/43.png', groupName:'nose'},
    {src:'assets/images/nose/44.png', groupName:'nose'},
    {src:'assets/images/nose/45.png', groupName:'nose'},
    {src:'assets/images/nose/46.png', groupName:'nose'},
    {src:'assets/images/nose/47.png', groupName:'nose'},
    {src:'assets/images/nose/49.png', groupName:'nose'},
    {src:'assets/images/nose/50.png', groupName:'nose'},
    {src:'assets/images/nose/51.png', groupName:'nose'},
    {src:'assets/images/nose/52.png', groupName:'nose'},
    {src:'assets/images/nose/53.png', groupName:'nose'},
    {src:'assets/images/nose/54.png', groupName:'nose'},
    {src:'assets/images/nose/55.png', groupName:'nose'},
    {src:'assets/images/nose/56.png', groupName:'nose'},
    {src:'assets/images/nose/57.png', groupName:'nose'},
    {src:'assets/images/nose/58.png', groupName:'nose'},
    {src:'assets/images/nose/59.png', groupName:'nose'},
    {src:'assets/images/nose/60.png', groupName:'nose'},
    {src:'assets/images/nose/63.png', groupName:'nose'},
    {src:'assets/images/nose/64.png', groupName:'nose'},
    {src:'assets/images/nose/65.png', groupName:'nose'},

    {src:'assets/images/mouth/00.png', groupName:'mouth'},
    {src:'assets/images/mouth/01.png', groupName:'mouth'},
    {src:'assets/images/mouth/02.png', groupName:'mouth'},
    {src:'assets/images/mouth/03.png', groupName:'mouth'},
    {src:'assets/images/mouth/04.png', groupName:'mouth'},
    {src:'assets/images/mouth/05.png', groupName:'mouth'},
    {src:'assets/images/mouth/06.png', groupName:'mouth'},
    {src:'assets/images/mouth/07.png', groupName:'mouth'},
    {src:'assets/images/mouth/08.png', groupName:'mouth'},
    {src:'assets/images/mouth/09.png', groupName:'mouth'},
    {src:'assets/images/mouth/10.png', groupName:'mouth'},
    {src:'assets/images/mouth/11.png', groupName:'mouth'},
    {src:'assets/images/mouth/12.png', groupName:'mouth'},
    {src:'assets/images/mouth/14.png', groupName:'mouth'},
    {src:'assets/images/mouth/15.png', groupName:'mouth'},
    {src:'assets/images/mouth/16.png', groupName:'mouth'},
    {src:'assets/images/mouth/17.png', groupName:'mouth'},
    {src:'assets/images/mouth/18.png', groupName:'mouth'},
    {src:'assets/images/mouth/19.png', groupName:'mouth'},
    {src:'assets/images/mouth/20.png', groupName:'mouth'},
    {src:'assets/images/mouth/21.png', groupName:'mouth'},
    {src:'assets/images/mouth/22.png', groupName:'mouth'},
    {src:'assets/images/mouth/23.png', groupName:'mouth'},
    {src:'assets/images/mouth/24.png', groupName:'mouth'},
    {src:'assets/images/mouth/25.png', groupName:'mouth'},
    {src:'assets/images/mouth/26.png', groupName:'mouth'},
    {src:'assets/images/mouth/27.png', groupName:'mouth'},
    {src:'assets/images/mouth/28.png', groupName:'mouth'},
    {src:'assets/images/mouth/29.png', groupName:'mouth'},
    {src:'assets/images/mouth/31.png', groupName:'mouth'},
    {src:'assets/images/mouth/32.png', groupName:'mouth'},
    {src:'assets/images/mouth/33.png', groupName:'mouth'},
    {src:'assets/images/mouth/34.png', groupName:'mouth'},
    {src:'assets/images/mouth/35.png', groupName:'mouth'},
    {src:'assets/images/mouth/38.png', groupName:'mouth'},
    {src:'assets/images/mouth/39.png', groupName:'mouth'},
    {src:'assets/images/mouth/40.png', groupName:'mouth'},
    {src:'assets/images/mouth/41.png', groupName:'mouth'},
    {src:'assets/images/mouth/42.png', groupName:'mouth'},
    {src:'assets/images/mouth/43.png', groupName:'mouth'},
    {src:'assets/images/mouth/44.png', groupName:'mouth'},
    {src:'assets/images/mouth/45.png', groupName:'mouth'},
    {src:'assets/images/mouth/46.png', groupName:'mouth'},
    {src:'assets/images/mouth/47.png', groupName:'mouth'},
    {src:'assets/images/mouth/49.png', groupName:'mouth'},
    {src:'assets/images/mouth/50.png', groupName:'mouth'},
    {src:'assets/images/mouth/51.png', groupName:'mouth'},
    {src:'assets/images/mouth/52.png', groupName:'mouth'},
    {src:'assets/images/mouth/53.png', groupName:'mouth'},
    {src:'assets/images/mouth/54.png', groupName:'mouth'},
    {src:'assets/images/mouth/55.png', groupName:'mouth'},
    {src:'assets/images/mouth/56.png', groupName:'mouth'},
    {src:'assets/images/mouth/57.png', groupName:'mouth'},
    {src:'assets/images/mouth/58.png', groupName:'mouth'},
    {src:'assets/images/mouth/59.png', groupName:'mouth'},
    {src:'assets/images/mouth/60.png', groupName:'mouth'},
    {src:'assets/images/mouth/63.png', groupName:'mouth'},
    {src:'assets/images/mouth/64.png', groupName:'mouth'},
    {src:'assets/images/mouth/65.png', groupName:'mouth'},

    {src:'assets/images/lefteye/00.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/01.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/02.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/03.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/04.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/05.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/06.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/07.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/08.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/09.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/10.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/11.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/12.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/14.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/15.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/16.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/17.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/18.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/19.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/20.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/21.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/22.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/23.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/24.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/25.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/26.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/27.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/28.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/29.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/31.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/32.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/33.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/34.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/35.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/38.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/39.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/40.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/41.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/42.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/43.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/44.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/45.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/46.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/47.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/49.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/50.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/51.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/52.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/53.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/54.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/55.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/56.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/57.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/58.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/59.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/60.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/63.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/64.png', groupName:'lefteye'},
    {src:'assets/images/lefteye/65.png', groupName:'lefteye'},

    {src:'assets/images/righteye/00.png', groupName:'righteye'},
    {src:'assets/images/righteye/01.png', groupName:'righteye'},
    {src:'assets/images/righteye/02.png', groupName:'righteye'},
    {src:'assets/images/righteye/03.png', groupName:'righteye'},
    {src:'assets/images/righteye/04.png', groupName:'righteye'},
    {src:'assets/images/righteye/05.png', groupName:'righteye'},
    {src:'assets/images/righteye/06.png', groupName:'righteye'},
    {src:'assets/images/righteye/07.png', groupName:'righteye'},
    {src:'assets/images/righteye/08.png', groupName:'righteye'},
    {src:'assets/images/righteye/09.png', groupName:'righteye'},
    {src:'assets/images/righteye/10.png', groupName:'righteye'},
    {src:'assets/images/righteye/11.png', groupName:'righteye'},
    {src:'assets/images/righteye/12.png', groupName:'righteye'},
    {src:'assets/images/righteye/14.png', groupName:'righteye'},
    {src:'assets/images/righteye/15.png', groupName:'righteye'},
    {src:'assets/images/righteye/16.png', groupName:'righteye'},
    {src:'assets/images/righteye/17.png', groupName:'righteye'},
    {src:'assets/images/righteye/18.png', groupName:'righteye'},
    {src:'assets/images/righteye/19.png', groupName:'righteye'},
    {src:'assets/images/righteye/20.png', groupName:'righteye'},
    {src:'assets/images/righteye/21.png', groupName:'righteye'},
    {src:'assets/images/righteye/22.png', groupName:'righteye'},
    {src:'assets/images/righteye/23.png', groupName:'righteye'},
    {src:'assets/images/righteye/24.png', groupName:'righteye'},
    {src:'assets/images/righteye/25.png', groupName:'righteye'},
    {src:'assets/images/righteye/26.png', groupName:'righteye'},
    {src:'assets/images/righteye/27.png', groupName:'righteye'},
    {src:'assets/images/righteye/28.png', groupName:'righteye'},
    {src:'assets/images/righteye/29.png', groupName:'righteye'},
    {src:'assets/images/righteye/31.png', groupName:'righteye'},
    {src:'assets/images/righteye/32.png', groupName:'righteye'},
    {src:'assets/images/righteye/33.png', groupName:'righteye'},
    {src:'assets/images/righteye/34.png', groupName:'righteye'},
    {src:'assets/images/righteye/35.png', groupName:'righteye'},
    {src:'assets/images/righteye/38.png', groupName:'righteye'},
    {src:'assets/images/righteye/39.png', groupName:'righteye'},
    {src:'assets/images/righteye/40.png', groupName:'righteye'},
    {src:'assets/images/righteye/41.png', groupName:'righteye'},
    {src:'assets/images/righteye/42.png', groupName:'righteye'},
    {src:'assets/images/righteye/43.png', groupName:'righteye'},
    {src:'assets/images/righteye/44.png', groupName:'righteye'},
    {src:'assets/images/righteye/45.png', groupName:'righteye'},
    {src:'assets/images/righteye/46.png', groupName:'righteye'},
    {src:'assets/images/righteye/47.png', groupName:'righteye'},
    {src:'assets/images/righteye/49.png', groupName:'righteye'},
    {src:'assets/images/righteye/50.png', groupName:'righteye'},
    {src:'assets/images/righteye/51.png', groupName:'righteye'},
    {src:'assets/images/righteye/52.png', groupName:'righteye'},
    {src:'assets/images/righteye/53.png', groupName:'righteye'},
    {src:'assets/images/righteye/54.png', groupName:'righteye'},
    {src:'assets/images/righteye/55.png', groupName:'righteye'},
    {src:'assets/images/righteye/56.png', groupName:'righteye'},
    {src:'assets/images/righteye/57.png', groupName:'righteye'},
    {src:'assets/images/righteye/58.png', groupName:'righteye'},
    {src:'assets/images/righteye/59.png', groupName:'righteye'},
    {src:'assets/images/righteye/60.png', groupName:'righteye'},
    {src:'assets/images/righteye/63.png', groupName:'righteye'},
    {src:'assets/images/righteye/64.png', groupName:'righteye'},
    {src:'assets/images/righteye/65.png', groupName:'righteye'}
];

function PreloaderList(list)
{
    // returns the list sorted so that loader loads items
    // from all groups in parallel instead of one group at a time
    function getList()
    {
        var groups = createFacePartGroups(list);
        var sortedList = createSortedList(groups);
        return sortedList;
    }

    function createFacePartGroups(facePartList)
    {
        var result = [];
        var groupNames = [];
        var groupName;
        var groupIndex;
        var item;

        for(var i = 0; i < facePartList.length; i++)
        {
            item = facePartList[i];
            groupName = item.groupName;
            groupIndex = groupNames.indexOf(groupName);

            if(groupIndex < 0)
            {
                groupNames.push(groupName);
                result.push([]);
                groupIndex = groupNames.indexOf(groupName);
            }

            result[groupIndex].push(item);
        }

        return result;
    }

    function createSortedList(facePartGroups)
    {
        var length = getHighestGroupLength(facePartGroups);
        var numberOfGroups = facePartGroups.length;
        var result = [];
        var item;

        for(var i = 0; i < length; i++)
        {
            for(var j = 0; j < numberOfGroups; j++)
            {
                item = facePartGroups[j][i];

                if(item)
                {
                    result.push(item);
                }
            }
        }

        return result;
    }

    function getHighestGroupLength(facePartGroups)
    {
        var highestLength = 0;

        for(var i = 0; i < facePartGroups.length; i++)
        {
            if(facePartGroups[i].length > highestLength)
            {
                highestLength = facePartGroups[i].length;
            }
        }

        return highestLength;
    }

    return {
        getList: getList
    };
}

module.exports = new PreloaderList(list);