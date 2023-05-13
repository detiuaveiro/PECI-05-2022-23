using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class InitialDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Alerts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alerts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AlertConfigs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Network = table.Column<string>(type: "text", nullable: false),
                    Device = table.Column<string>(type: "text", nullable: false),
                    Enabled = table.Column<bool>(type: "boolean", nullable: false),
                    AlertId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlertConfigs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AlertConfigs_Alerts_AlertId",
                        column: x => x.AlertId,
                        principalTable: "Alerts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AlertParams",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    AlertId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlertParams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AlertParams_Alerts_AlertId",
                        column: x => x.AlertId,
                        principalTable: "Alerts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AlertConfigRoles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AlertConfigId = table.Column<Guid>(type: "uuid", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlertConfigRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AlertConfigRoles_AlertConfigs_AlertConfigId",
                        column: x => x.AlertConfigId,
                        principalTable: "AlertConfigs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AlertConfigParamValues",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AlertConfigId = table.Column<Guid>(type: "uuid", nullable: false),
                    AlertParamId = table.Column<Guid>(type: "uuid", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlertConfigParamValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AlertConfigParamValues_AlertConfigs_AlertConfigId",
                        column: x => x.AlertConfigId,
                        principalTable: "AlertConfigs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AlertConfigParamValues_AlertParams_AlertParamId",
                        column: x => x.AlertParamId,
                        principalTable: "AlertParams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AlertConfigParamValues_AlertConfigId",
                table: "AlertConfigParamValues",
                column: "AlertConfigId");

            migrationBuilder.CreateIndex(
                name: "IX_AlertConfigParamValues_AlertParamId",
                table: "AlertConfigParamValues",
                column: "AlertParamId");

            migrationBuilder.CreateIndex(
                name: "IX_AlertConfigRoles_AlertConfigId",
                table: "AlertConfigRoles",
                column: "AlertConfigId");

            migrationBuilder.CreateIndex(
                name: "IX_AlertConfigs_AlertId",
                table: "AlertConfigs",
                column: "AlertId");

            migrationBuilder.CreateIndex(
                name: "IX_AlertParams_AlertId",
                table: "AlertParams",
                column: "AlertId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AlertConfigParamValues");

            migrationBuilder.DropTable(
                name: "AlertConfigRoles");

            migrationBuilder.DropTable(
                name: "AlertParams");

            migrationBuilder.DropTable(
                name: "AlertConfigs");

            migrationBuilder.DropTable(
                name: "Alerts");
        }
    }
}
