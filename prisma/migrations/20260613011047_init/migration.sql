-- CreateTable
CREATE TABLE "Modelo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "familia" TEXT NOT NULL,
    "lineaProducto" TEXT NOT NULL,
    "valorRef" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Inventario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serie" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fechaCorte" DATETIME NOT NULL,
    "idModelo" INTEGER NOT NULL,
    CONSTRAINT "Inventario_idModelo_fkey" FOREIGN KEY ("idModelo") REFERENCES "Modelo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fechaCorte" DATETIME NOT NULL,
    "paisDestino" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "eta" DATETIME NOT NULL,
    "puertoOrigen" TEXT NOT NULL,
    "puertoDestino" TEXT NOT NULL,
    "estadoEmbarque" TEXT NOT NULL,
    "idModelo" INTEGER NOT NULL,
    CONSTRAINT "Transito_idModelo_fkey" FOREIGN KEY ("idModelo") REFERENCES "Modelo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Oportunidad" (
    "idOportunidad" TEXT NOT NULL PRIMARY KEY,
    "nombreCliente" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "ejecutivo" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "probabilidadCierre" INTEGER NOT NULL,
    "fechaCierre" DATETIME NOT NULL,
    "valorUSD" INTEGER NOT NULL,
    "estadoOportunidad" TEXT NOT NULL,
    "idModelo" INTEGER NOT NULL,
    CONSTRAINT "Oportunidad_idModelo_fkey" FOREIGN KEY ("idModelo") REFERENCES "Modelo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
