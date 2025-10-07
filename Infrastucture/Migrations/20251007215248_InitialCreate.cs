using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastucture.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Gosts",
                columns: table => new
                {
                    IdGost = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Link = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gosts", x => x.IdGost);
                });

            migrationBuilder.CreateTable(
                name: "Manufacturers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Manufacturers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SteelGrades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SteelGrades", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stocks",
                columns: table => new
                {
                    StockId = table.Column<Guid>(type: "uuid", nullable: false),
                    City = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    StockName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Address = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stocks", x => x.StockId);
                });

            migrationBuilder.CreateTable(
                name: "Types",
                columns: table => new
                {
                    IDType = table.Column<Guid>(type: "uuid", nullable: false),
                    PipeType = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    IDParentType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Types", x => x.IDType);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Surname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Inn = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Nomenclatures",
                columns: table => new
                {
                    IdNomenclature = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    TypeIDType = table.Column<Guid>(type: "uuid", nullable: false),
                    IDTypeNew = table.Column<int>(type: "integer", nullable: false),
                    ProductionType = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    IDFunctionType = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    FormOfLength = table.Column<decimal>(type: "numeric(18,3)", nullable: false),
                    ManufacturerId = table.Column<int>(type: "integer", nullable: false),
                    SteelGradeId = table.Column<int>(type: "integer", nullable: false),
                    Diameter = table.Column<decimal>(type: "numeric(18,3)", nullable: false),
                    ProfileSize2 = table.Column<decimal>(type: "numeric(18,3)", nullable: false),
                    PipeWallThickness = table.Column<decimal>(type: "numeric(18,3)", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Koef = table.Column<decimal>(type: "numeric(18,6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nomenclatures", x => x.IdNomenclature);
                    table.ForeignKey(
                        name: "FK_Nomenclatures_Manufacturers_SteelGradeId",
                        column: x => x.SteelGradeId,
                        principalTable: "Manufacturers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Nomenclatures_SteelGrades_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "SteelGrades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Nomenclatures_Types_TypeIDType",
                        column: x => x.TypeIDType,
                        principalTable: "Types",
                        principalColumn: "IDType",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    CartId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => x.CartId);
                    table.ForeignKey(
                        name: "FK_Carts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NomenclaturesGosts",
                columns: table => new
                {
                    GostsIdGost = table.Column<int>(type: "integer", nullable: false),
                    NomenclatureIdNomenclature = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NomenclaturesGosts", x => new { x.GostsIdGost, x.NomenclatureIdNomenclature });
                    table.ForeignKey(
                        name: "FK_NomenclaturesGosts_Gosts_GostsIdGost",
                        column: x => x.GostsIdGost,
                        principalTable: "Gosts",
                        principalColumn: "IdGost",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NomenclaturesGosts_Nomenclatures_NomenclatureIdNomenclature",
                        column: x => x.NomenclatureIdNomenclature,
                        principalTable: "Nomenclatures",
                        principalColumn: "IdNomenclature",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Prices",
                columns: table => new
                {
                    NomenclatureId = table.Column<int>(type: "integer", nullable: false),
                    StockId = table.Column<Guid>(type: "uuid", nullable: false),
                    PriceT = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PriceLimitT1 = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PriceT1 = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PriceLimitT2 = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PriceT2 = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PriceM = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PriceLimitM1 = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PriceM1 = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PriceLimitM2 = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PriceM2 = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    NDS = table.Column<decimal>(type: "numeric(5,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prices", x => new { x.NomenclatureId, x.StockId });
                    table.ForeignKey(
                        name: "FK_Prices_Nomenclatures_NomenclatureId",
                        column: x => x.NomenclatureId,
                        principalTable: "Nomenclatures",
                        principalColumn: "IdNomenclature",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Prices_Stocks_StockId",
                        column: x => x.StockId,
                        principalTable: "Stocks",
                        principalColumn: "StockId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Remnants",
                columns: table => new
                {
                    NomenclatureId = table.Column<int>(type: "integer", nullable: false),
                    StockId = table.Column<Guid>(type: "uuid", nullable: false),
                    InStockT = table.Column<decimal>(type: "numeric(18,3)", nullable: false),
                    InStockM = table.Column<decimal>(type: "numeric(18,3)", nullable: false),
                    SoonArriveT = table.Column<decimal>(type: "numeric(18,3)", nullable: false),
                    SoonArriveM = table.Column<decimal>(type: "numeric(18,3)", nullable: false),
                    ReservedT = table.Column<decimal>(type: "numeric(18,3)", nullable: false),
                    ReservedM = table.Column<decimal>(type: "numeric(18,3)", nullable: false),
                    UnderTheOrder = table.Column<bool>(type: "boolean", nullable: false),
                    AvgTubeLength = table.Column<decimal>(type: "numeric(18,3)", nullable: false),
                    AvgTubeWeight = table.Column<decimal>(type: "numeric(18,3)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Remnants", x => new { x.NomenclatureId, x.StockId });
                    table.ForeignKey(
                        name: "FK_Remnants_Nomenclatures_NomenclatureId",
                        column: x => x.NomenclatureId,
                        principalTable: "Nomenclatures",
                        principalColumn: "IdNomenclature",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Remnants_Stocks_StockId",
                        column: x => x.StockId,
                        principalTable: "Stocks",
                        principalColumn: "StockId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CartItems",
                columns: table => new
                {
                    CartItemId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NomenclatureId = table.Column<int>(type: "integer", nullable: false),
                    StockId = table.Column<Guid>(type: "uuid", nullable: false),
                    Quantity = table.Column<decimal>(type: "numeric(18,3)", nullable: false),
                    Scale = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    CartId = table.Column<int>(type: "integer", nullable: true),
                    OrderId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartItems", x => x.CartItemId);
                    table.ForeignKey(
                        name: "FK_CartItems_Carts_CartId",
                        column: x => x.CartId,
                        principalTable: "Carts",
                        principalColumn: "CartId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartItems_Nomenclatures_NomenclatureId",
                        column: x => x.NomenclatureId,
                        principalTable: "Nomenclatures",
                        principalColumn: "IdNomenclature",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartItems_Stocks_StockId",
                        column: x => x.StockId,
                        principalTable: "Stocks",
                        principalColumn: "StockId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_CartId",
                table: "CartItems",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_NomenclatureId",
                table: "CartItems",
                column: "NomenclatureId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_OrderId",
                table: "CartItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_StockId",
                table: "CartItems",
                column: "StockId");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_UserId",
                table: "Carts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Nomenclatures_ManufacturerId",
                table: "Nomenclatures",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Nomenclatures_SteelGradeId",
                table: "Nomenclatures",
                column: "SteelGradeId");

            migrationBuilder.CreateIndex(
                name: "IX_Nomenclatures_TypeIDType",
                table: "Nomenclatures",
                column: "TypeIDType");

            migrationBuilder.CreateIndex(
                name: "IX_NomenclaturesGosts_NomenclatureIdNomenclature",
                table: "NomenclaturesGosts",
                column: "NomenclatureIdNomenclature");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Prices_StockId",
                table: "Prices",
                column: "StockId");

            migrationBuilder.CreateIndex(
                name: "IX_Remnants_StockId",
                table: "Remnants",
                column: "StockId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Inn",
                table: "Users",
                column: "Inn",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Phone",
                table: "Users",
                column: "Phone",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CartItems");

            migrationBuilder.DropTable(
                name: "NomenclaturesGosts");

            migrationBuilder.DropTable(
                name: "Prices");

            migrationBuilder.DropTable(
                name: "Remnants");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Gosts");

            migrationBuilder.DropTable(
                name: "Nomenclatures");

            migrationBuilder.DropTable(
                name: "Stocks");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Manufacturers");

            migrationBuilder.DropTable(
                name: "SteelGrades");

            migrationBuilder.DropTable(
                name: "Types");
        }
    }
}
