export default function CenterLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex-1 flex items-center justify-center">
			<div className="w-full max-w-[500px] mx-auto space-y-6 px-4">
				{children}
			</div>
		</div>
	)
}