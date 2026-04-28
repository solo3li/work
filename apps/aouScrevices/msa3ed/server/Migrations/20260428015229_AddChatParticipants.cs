using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Uis.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddChatParticipants : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ExecutorId",
                table: "Chats",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "StudentId",
                table: "Chats",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Chats_ExecutorId",
                table: "Chats",
                column: "ExecutorId");

            migrationBuilder.CreateIndex(
                name: "IX_Chats_StudentId",
                table: "Chats",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Chats_Users_ExecutorId",
                table: "Chats",
                column: "ExecutorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Chats_Users_StudentId",
                table: "Chats",
                column: "StudentId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chats_Users_ExecutorId",
                table: "Chats");

            migrationBuilder.DropForeignKey(
                name: "FK_Chats_Users_StudentId",
                table: "Chats");

            migrationBuilder.DropIndex(
                name: "IX_Chats_ExecutorId",
                table: "Chats");

            migrationBuilder.DropIndex(
                name: "IX_Chats_StudentId",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "ExecutorId",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Chats");
        }
    }
}
