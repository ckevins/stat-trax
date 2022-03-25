﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(StatTraxDbContext))]
    [Migration("20220206214147_AddCaughtStealing")]
    partial class AddCaughtStealing
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("AtBat", b =>
                {
                    b.Property<int>("AtBatId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AtBatId"), 1L, 1);

                    b.Property<int>("Balls")
                        .HasColumnType("int");

                    b.Property<int>("CS")
                        .HasColumnType("int");

                    b.Property<int>("Inning")
                        .HasColumnType("int");

                    b.Property<int>("Outs")
                        .HasColumnType("int");

                    b.Property<string>("PitchType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PlayerGameId")
                        .HasColumnType("int");

                    b.Property<int>("RBI")
                        .HasColumnType("int");

                    b.Property<string>("Result")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RunnerProgress")
                        .HasColumnType("int");

                    b.Property<int>("SB")
                        .HasColumnType("int");

                    b.Property<int>("Strikes")
                        .HasColumnType("int");

                    b.HasKey("AtBatId");

                    b.HasIndex("PlayerGameId");

                    b.ToTable("AtBats");
                });

            modelBuilder.Entity("IndividualPlayer", b =>
                {
                    b.Property<int>("IndividualPlayerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IndividualPlayerId"), 1L, 1);

                    b.Property<string>("Bats")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TeamName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Throws")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IndividualPlayerId");

                    b.ToTable("IndividualPlayers");
                });

            modelBuilder.Entity("PlayerGame", b =>
                {
                    b.Property<int>("PlayerGameId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PlayerGameId"), 1L, 1);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("IndividualPlayerId")
                        .HasColumnType("int");

                    b.Property<string>("Opponent")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PlayerGameId");

                    b.HasIndex("IndividualPlayerId");

                    b.ToTable("PlayerGames");
                });

            modelBuilder.Entity("AtBat", b =>
                {
                    b.HasOne("PlayerGame", null)
                        .WithMany("AtBats")
                        .HasForeignKey("PlayerGameId");
                });

            modelBuilder.Entity("PlayerGame", b =>
                {
                    b.HasOne("IndividualPlayer", "IndividualPlayer")
                        .WithMany()
                        .HasForeignKey("IndividualPlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("IndividualPlayer");
                });

            modelBuilder.Entity("PlayerGame", b =>
                {
                    b.Navigation("AtBats");
                });
#pragma warning restore 612, 618
        }
    }
}