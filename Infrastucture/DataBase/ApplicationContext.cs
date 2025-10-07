using Domain.Entities;
using Infrastucture.DataBase.Configuration;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.DataBase
{
	public class ApplicationContext : DbContext, IDbContext
	{
		public DbSet<Cart> Carts { get; set; }
		public DbSet<CartItem> CartItems { get; set; }
		public DbSet<Nomenclature> Nomenclatures { get; set; }
		public DbSet<Order> Orders { get; set; }
		public DbSet<Price> Prices { get; set; }
		public DbSet<Remnants> Remnants { get; set; }
		public DbSet<Stock> Stocks { get; set; }
		public DbSet<Domain.Entities.Type> Types { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<Gost> Gosts { get; set; }
		public DbSet<Manufacturer> Manufacturers { get; set; }
		public DbSet<SteelGrade> SteelGrades { get; set; }

		public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
		{
			Database.EnsureCreated();
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfigurationsFromAssembly(typeof(CartConfiguration).Assembly);
		}
	}
}
