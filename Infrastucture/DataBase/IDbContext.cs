using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.DataBase
{
	public interface IDbContext 
	{
		DbSet<Cart> Carts { get; set; }
		DbSet<CartItem> CartItems { get; set; }
		DbSet<Nomenclature> Nomenclatures { get; set; }
		DbSet<Order> Orders { get; set; }
		DbSet<Price> Prices { get; set; }
		DbSet<Remnants> Remnants { get; set; }
		DbSet<Stock> Stocks { get; set; }
		DbSet<Domain.Entities.Type> Types { get; set; }
		DbSet<User> Users { get; set; }
		DbSet<Gost> Gosts { get; set; }
		DbSet<Manufacturer> Manufacturers { get; set; }
		DbSet<SteelGrade> SteelGrades { get; set; }

		Task<int> SaveChangesAsync(CancellationToken cancellationToken);
	}
}
