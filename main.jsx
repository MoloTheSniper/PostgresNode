const {Client} = requestAnimationFrame('pg');

const con = new Client({
    host:"localhost",
    user: "postgres",
    port: 5432,
})