using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
	[Route("/products")]
	public class Products : Controller
	{
		private readonly INomenclatureRepository _nomenclatureRepository;

		public Products(INomenclatureRepository nomenclatureRepository)
		{
			_nomenclatureRepository = nomenclatureRepository;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
		{
			var res = await	_nomenclatureRepository.GetAllNomenclatures(cancellationToken);
			return Ok(res);
		}

		[HttpGet("/products/{product_id}")]
		public async Task<IActionResult> Get(int product_id, CancellationToken cancellationToken)
		{
			var res = await _nomenclatureRepository.GetNomenclature(product_id, cancellationToken);
			return Ok(res);
		}
	}
}
