class FindPath {
    constructor() {
        this.cache = {}
    }

    dijkstra(graph, source, dest) {
        //buat adjacency list
        var vertices = []
        var connected = {}
        graph.forEach((edge) => {
            if (vertices.indexOf(edge[0]) == -1) {
                vertices.push(edge[0])
            }
            //buat array baru untuk menampung keterhubungan jika edge[0] masih kosong 
            if (connected[edge[0]] == null) {
                connected[edge[0]] = []
            }
            connected[edge[0]].push({ end: edge[1], size: edge[2] })

            if (vertices.indexOf(edge[1]) == -1) {
                vertices.push(edge[1])
            }
            //buat array baru untuk menampung keterhubungan jika edge[1] masih kosong 
            if (connected[edge[1]] == null) {
                connected[edge[1]] = []
            }
            connected[edge[1]].push({ end: edge[0], size: edge[2] })
        })
        // console.log(vertices)
        // console.log(connected)

        var jarak = {}
        //inisialisasi
        vertices.forEach((vertex) => {
            jarak[vertex] = Number.POSITIVE_INFINITY
            this.cache[vertex] = null
        })
        //inisialisasi jarak a= 0 
        jarak[source] = 0
        var now = vertices
        var min
        var u
        while (now.length > 0) {
            //pilih node terdekat
            min = Number.POSITIVE_INFINITY; //min diinisialisasi infinity
            now.forEach((vertex) => {
                //cek mana jarak yang paling pendek
                if (jarak[vertex] < min) {
                    min = jarak[vertex]
                    u = vertex
                }
            })
            //current node nya di remove
            now.splice(now.indexOf(u), 1)

            if (jarak[u] == Number.POSITIVE_INFINITY || u == dest) {
                break;
            }

            //ubah lintasan
            if (connected[u] != null) {
                connected[u].forEach((arr) => {
                    var jum = jarak[u] + arr["size"]
                    //cek apakah jumlah dari awal sampai node saat ini < jarak sebelumnya
                    if (jum < jarak[arr["end"]]) {
                        jarak[arr["end"]] = jum
                        this.cache[arr["end"]] = u 
                    }
                })
            }
        }

        //telusuri listasan yang terbentuk
        var solution = [];
        while (this.cache[dest] != null) {
            //di masukkan di depannya
            solution.unshift(dest);
            dest = this.cache[dest];
        }
        solution.unshift(dest);

        let result = solution
        let distance = min

        return {
            result,
            distance
        }
    }

    choose(array, start, dest) {
        console.log(`${start} - ${dest} : ${this.dijkstra(array, start, dest).result}\ndengan jarak ${this.dijkstra(array, start, dest).distance}`)
    }
}

module.exports = FindPath