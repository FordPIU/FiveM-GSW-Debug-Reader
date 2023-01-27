import 'fs';

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    crimson: "\x1b[38m"
}
const colorCodes = {
    "^1": colors.red,
    "^2": colors.green,
    "^3": colors.yellow,
    "^5": colors.blue,
    "^6": colors.magenta,
    "^7": colors.white,

    "^4": colors.dim + colors.blue,
    "^8": colors.dim + colors.red,
    "^9": colors.dim + colors.magenta
}

function DeepSearch(AObject)
{
    for (var key1 in AObject)
    {
        let data1 = AObject[key1]

        if (typeof(data1) == "object") {
            console.log("   ", key1, ":")

            for (var key2 in data1)
            {
                let data2 = data1[key2]
                if (typeof(data2) == "object") {
                    console.log("       ", key2, ":")

                    for (var key3 in data2)
                    {
                        let data3 = data2[key3]

                        if (typeof(data3) == "object") {
                            console.log("           ", key3, ":")

                            for (var key4 in data3)
                            {
                                let data4 = data3[key4]

                                if (typeof(data4) == "object") {
                                    console.log("               ", key4, ":")
                                } else {
                                    console.log("               ", key4, ":", data4)
                                }
                            }
                        } else {
                            console.log("           ", key3, ":", data3)
                        }
                    }
                } else {
                    console.log("       ", key2, ":", data2)
                }
            }

        } else {
            console.log("   ", key1, ":", data1)
        }
    }
}

function Init()
{
    const FileText = fs.readFileSync('Data.json', 'utf8');
    var DataFile = JSON.parse(FileText);

    var Hits = DataFile.Hits;
    var Bleeds = DataFile.Bleeds;
    var Threads = DataFile.Threads;
    var Log_Msgs = DataFile.Log;
    // Unfinished for 0.9
    // Hits
    console.log('\n\n\n------------------------------------------- HITS -------------------------------------------');
    console.log("Data Container for Every Hit Registered.");
    console.log("----------------------------------------------------------------------------------------------");
    for (var key in Hits)
    {
        console.log("\nHit #" + (parseInt(key) + 1));

        DeepSearch(Hits[key])
    }

    // Bleeds
    console.log('\n\n\n------------------------------------------- BLEEDS -------------------------------------------');
    console.log("Data Container for Bleedout Effect, contains every ped, their holes, blood data, and more.");
    console.log("----------------------------------------------------------------------------------------------");
    for (var key in Bleeds)
    {
        console.log("\nBleed For Entity " + (parseInt(key) + 1));

        DeepSearch(Bleeds[key])
    }

    // Threads
    console.log('\n\n\n------------------------------------------- THREAD -------------------------------------------');
    console.log("Data Container for all Threads, containing important information on what that thread is doing.");
    console.log("----------------------------------------------------------------------------------------------");
    for (var key in Threads)
    {
        console.log("\nThread " + key);

        DeepSearch(Threads[key])
    }

    // Log Msgs
    console.log('\n\n\n-------------------------------------------- LOGS --------------------------------------------');
    console.log("Internal Logging detailing what the script is doing.");
    console.log("----------------------------------------------------------------------------------------------");
    for (var key in Log_Msgs)
    {
        var value = Log_Msgs[key]
    
        if (key.includes("^")) {

            for (var FiveMCode in colorCodes)
            {
                var JSCode = colorCodes[FiveMCode]

                key = key.replace(FiveMCode, JSCode)
            }

        }
        if (value.includes("^")) {
            for (var FiveMCode in colorCodes)
            {
                var JSCode = colorCodes[FiveMCode]

                value = value.replace(FiveMCode, JSCode)
            }
        }

        if (parseInt(key) != null) {
            console.log(value)
        } else {
            console.log(key, ":", value)
        }
    }
}

Init();