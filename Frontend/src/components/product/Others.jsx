const Others = ({ others, otherVariant, setOtherVariant }) => {
	const handleSizeChange = (other) => {
		if (otherVariant === other) {
			setOtherVariant(null); // Deselect the other if it's already selected
		} else {
			setOtherVariant(other); // Select the clicked other
		}
	};

	// Filter out empty strings from the others array
	const nonEmptyVariants = others.filter((other) => other.trim() !== "");

	// Check if nonEmptyVariants is empty, and render null if it is
	if (nonEmptyVariants.length === 0) {
		return null;
	}

	return (
		<div className='flex flex-col gap-[50px]'>
			<div className='flex gap-2 md:gap-5 items-center '>
				<h2 className='text-[22px]'>Variants : </h2>
				<ul className='grid gap-6 md:grid-cols-4 text-sm'>
					{nonEmptyVariants.map((other, index) => (
						<li key={index}>
							<label
								className={`capitalize inline-flex items-center justify-between w-full py-[10px] px-4 rounded-3xl text-black border border-black cursor-pointer ${
									otherVariant === other
										? "text-white bg-teal-600 border-teal-600"
										: ""
								}`}
								onClick={() => handleSizeChange(other)}>
								<div className='block w-full'>
									<div className='w-full text-center'>{other}</div>
								</div>
							</label>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Others;
