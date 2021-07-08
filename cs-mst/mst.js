class MinimumSpanningTree {
    constructor() {
        this.cache = new Map()
    }

    adjacency(g) {
        //buat adjacency list
        var vertices = []
        var connected = {}
        g.forEach((edge) => {

            if (vertices.indexOf(edge[0]) == -1) {
                vertices.push(edge[0])
            }
            //buat array baru untuk menampung keterhubungan jika edge[0] masih kosong
            if (connected[edge[0]] == null) {
                connected[edge[0]] = []
            }
            connected[edge[0]].push({ vertex: edge[1], size: edge[2] })

            if (vertices.indexOf(edge[1]) == -1) {
                vertices.push(edge[1])
            }
            //buat array baru untuk menampung keterhubungan jika edge[1] masih kosong
            if (connected[edge[1]] == null) {
                connected[edge[1]] = []
            }
            connected[edge[1]].push({ vertex: edge[0], size: edge[2] })
        })

        return {
            vertices,
            connected
        }
    }

    pairEdges(connected) {

        let visited = new Set()
        let edges = new Map()
        let now = []
        let resultEdges = []
        let v = Object.keys(connected)[0]

        now.push(v); //push sebarang vertex (misal vertex yg pertama)

        while (now.length > 0) { //buat daftar edges beserta sizenya AB => 16
            let v = now.shift() //remove first element dari array
            visited.add(v)

            connected[v].forEach((arr) => {
                if (!visited.has(arr["vertex"])) {
                    edges.set(`${v}${arr["vertex"]}`, arr["size"])
                    now.push(arr["vertex"])
                }
            })
        }
        // console.log(edges)

        //masukkan sebagai array of object
        for (let key of edges.keys()) {
            resultEdges.push({ edge: key, size: edges.get(key) })
        }
        // console.log(resultEdges)

        return resultEdges
    }

    create(v) {
        this.cache.set(v, new Set([v])) //map yang valuenya berisikan himpunan
        // console.log(this.cache)
        return this.cache;
    }

    union(a, b) {
        let keyA, keyB;
        // check apakah a atau b ada di himpunan tersebut (kalau ada ganti key nya)
        for (let key of this.cache.keys()) {
            if (this.cache.get(key).has(a)) {
                // console.log('this cache ',this.cache)
                // console.log('himpunan ',key,' terdapat ',a,' di dalamnya')
                keyA = key
            }
            if (this.cache.get(key).has(b)) {
                // console.log('this cache ',this.cache)
                // console.log('himpunan ',key,' terdapat ',b,' di dalamnya')
                keyB = key
            }
        }

        if (!keyA || !keyB || keyA === keyB) {
            return null
        }

        // himpunan keyA diganti isi himpunan keyB
        this.cache.set(keyA, new Set([...this.cache.get(keyA), ... this.cache.get(keyB)]))

        // hapus keyB
        this.cache.delete(keyB)
        // console.log('new cache ',this.cache)
        return this.cache
    }

    checkSet(a, b) {
        // check apakah a dan b sekarang ada di himp yg sama (klu sama berarti cycle)
        for (let key of this.cache.keys()) {
            let set = this.cache.get(key)
            //    console.log('----> ',a,b)
            //    console.log(key,' => ',this.cache.get(key))
            if (set.has(a) && set.has(b)) {
                return true
            }
        }
        return false
    }

    kruskal(graph) {
        //ambil hasil adjacency list
        let vertices = this.adjacency(graph).vertices
        let connected = this.adjacency(graph).connected
        // console.log(vertices)
        // console.log(connected)

        let edges = null
        let result = []

        edges = this.pairEdges(connected) // ambil edges (digabungkan lagi yg terconnect)
        edges = edges.sort((a, b) => a.size - b.size) // urutkan edges secara menaik (by size)
        // console.log(edges)

        // buat himpunan untuk masing" vertex dlm map
        vertices.forEach((v) => {
            this.create(v)
        })

        // mengunjungi semua edges sambil menggabungkan edge" tsb 
        for (let e of edges) {
            let start = e.edge.split('')[0]
            let end = e.edge.split('')[1]
            // klu tidak dalam himp yg sama => tidak cycle
            if (!this.checkSet(start, end)) {
                // console.log('tidak dlm himpunan yg sama')
                result.push(e)
                // console.log(result)
                this.union(start, end)
            }
            // console.log('-----------------------')
        }
        return result

    }

    choose(array) {
        // this.kruskal(array)
        console.log(this.kruskal(array))
    }
}

module.exports = MinimumSpanningTree