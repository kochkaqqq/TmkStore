using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
	public class Handbook : Controller
	{
		private readonly ITypeRepository _typeRepository;
		private readonly IStockRepository _stockRepository;
		private readonly IManufatureRepository _manufatureRepository;
		private readonly IGostRepository _gostRepository;
		private readonly ISteelGradesRepository _steelGradesRepository;

		public Handbook(ITypeRepository typeRepository, IStockRepository stockRepository, IManufatureRepository manufatureRepository, 
			IGostRepository gostRepository, ISteelGradesRepository steelGradesRepository)
		{
			_typeRepository = typeRepository;
			_stockRepository = stockRepository;
			_manufatureRepository = manufatureRepository;
			_gostRepository = gostRepository;
			_steelGradesRepository = steelGradesRepository;
		}

		[HttpGet("/types")]
		public async Task<IActionResult> GetTypes(CancellationToken cancellationToken)
		{
			var res = await _typeRepository.GetAllTypes(cancellationToken);
			return Ok(res);
		}

		[HttpGet("/stocks")]
		public async Task<IActionResult> GetStocks(CancellationToken cancellationToken)
		{
			var res = await _stockRepository.GetStocks(cancellationToken);
			return Ok(res);
		}

		[HttpGet("/manufactures")]
		public async Task<IActionResult> GetManufactures(CancellationToken cancellationToken)
		{
			var res = await _manufatureRepository.GetManufacturers(cancellationToken);
			return Ok(res);
		}

		[HttpGet("/gosts")]
		public async Task<IActionResult> GetGosts(CancellationToken cancellationToken)
		{
			var res = await _gostRepository.GetGosts(cancellationToken);
			return Ok(res);
		}

		[HttpGet("/steel_grade")]
		public async Task<IActionResult> GetSteelGrades(CancellationToken cancellationToken)
		{
			var res = await _steelGradesRepository.GetSteelGrades(cancellationToken);
			return Ok(res);
		}
	}
}
