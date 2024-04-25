const Sizes = ({ sizes, selectedSize, setSelectedSize }) => {
	const handleSizeChange = (size) => {
		if (selectedSize === size) {
			setSelectedSize(null); // Deselect the size if it's already selected
		} else {
			setSelectedSize(size); // Select the clicked size
		}
	};

	// Filter out empty strings from the sizes array
	const nonEmptySizes = sizes.filter((size) => size.trim() !== "");

	// Check if nonEmptySizes is empty, and render null if it is
	if (nonEmptySizes.length === 0) {
		return null;
	}

	return (
		<div className=' flex flex-col gap-[50px]'>
			<div className='flex gap-2 md:gap-5 items-center'>
				<h2 className='text-[22px] whitespace-nowrap'>Available Date &nbsp; : </h2>
				<ul className=' gap-6 flex text-sm flex-wrap'>
					{nonEmptySizes.map((size, index) => (
						<li key={index}>
							<label
								className={`capitalize inline-flex items-center justify-between w-full py-[10px] px-4 rounded-3xl text-white border border-white cursor-pointer ${
									selectedSize === size
										? "text-white bg-teal-600 border-teal-600"
										: ""
								}`}
								onClick={() => handleSizeChange(size)}>
								<div className='block w-full'>
									<div className='w-full text-center'>{size}</div>
								</div>
							</label>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Sizes;
