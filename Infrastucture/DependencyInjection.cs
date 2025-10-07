using Domain.Interfaces;
using Infrastucture.Application;
using Infrastucture.DataBase;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastucture
{
	public static class DependencyInjection
	{
		public static void ConfigureRepositoryServices(this IServiceCollection services)
		{
			services.AddScoped<IGostRepository, GostRepository>();
			services.AddScoped<IManufatureRepository, ManufactureRepository>();
			services.AddScoped<ISteelGradesRepository, SteelGradeRepository>();
			services.AddScoped<IStockRepository, StockRepository>();
			services.AddScoped<INomenclatureRepository, NomenclatureRepository>();
			services.AddScoped<IPriceRepository, PriceRepository>();
			services.AddScoped<ITypeRepository, TypeRepository>();
		}

		public static void AddDataBase(this IServiceCollection services)
		{
			var conString = "User ID=postgres;Password=root;Host=localhost;Port=5432;Database=tmk_store;";
			services.AddDbContext<ApplicationContext>(opt => opt.UseNpgsql(conString));
			services.AddScoped<IDbContext>(provider => provider.GetService<ApplicationContext>());
		}
	}
}
