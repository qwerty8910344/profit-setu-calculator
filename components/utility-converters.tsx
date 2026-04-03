"use client"

import { useState } from 'react'
import { Upload, FileDown, RefreshCw, FileImage, FileCode2, FileText } from 'lucide-react'
import { Card } from '@/components/ui/card'

export function UtilityConverters({ activeTool }: { activeTool: string }) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [htmlContent, setHtmlContent] = useState("<h1>Hello ProfitSetu</h1>\n<p>This will convert dynamically!</p>")
  const [quality, setQuality] = useState("0.7")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [textInput, setTextInput] = useState("")
  const [passwordLen, setPasswordLen] = useState("8")
  const [outputResult, setOutputResult] = useState("")
  const [colorCode, setColorCode] = useState("#ff0000")

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleAction = async (action: () => Promise<void>) => {
    setIsProcessing(true)
    try {
      await action()
    } catch (e) {
      console.error(e)
      alert("An error occurred during conversion.")
    } finally {
      setIsProcessing(false)
    }
  }

  // 1. Image Converter (JPG/PNG)
  const convertImage = async (format: string) => {
    if (!preview) return
    const img = new Image()
    img.src = preview
    await new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.fillStyle = "#FFFFFF"
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0)
        }
        canvas.toBlob(blob => {
          if (!blob) return
          const link = document.createElement("a")
          link.href = URL.createObjectURL(blob)
          link.download = `converted.${format.split('/')[1]}`
          link.click()
          resolve(true)
        }, format)
      }
    })
  }

  // 2. Image to PDF
  const convertImageToPDF = async () => {
    if (!preview || !file) return
    const { jsPDF } = await import('jspdf')
    const pdf = new jsPDF()
    const type = file.type === 'image/png' ? 'PNG' : 'JPEG'
    pdf.addImage(preview, type, 10, 10, 180, 160)
    pdf.save("converted.pdf")
  }

  // 3. HTML to PDF
  const convertHTMLToPDF = async () => {
    try {
      // html2pdf is often tricky to import cleanly in Next.js without triggering SSR issues, so window injection works if it fails.
      const html2pdf = (await import('html2pdf.js')).default || (window as any).html2pdf
      const element = document.getElementById("html-content-preview")
      if (element && html2pdf) {
        await html2pdf().from(element).save("document.pdf")
      }
    } catch (e) {
      console.error("html2pdf import failed", e)
    }
  }

  // 4. HTML to PNG
  const convertHTMLToPNG = async () => {
    const html2canvas = (await import('html2canvas')).default
    const element = document.getElementById("html-content-preview")
    if (element && html2canvas) {
      const canvas = await html2canvas(element)
      const link = document.createElement("a")
      link.download = "screenshot.png"
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  // 5. PDF to Image
  const convertPDFToImage = async () => {
    if (!file) return
    const pdfjsLib = await import('pdfjs-dist')
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
    
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise
    const page = await pdf.getPage(1)
    const viewport = page.getViewport({ scale: 1.5 })
    
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.height = viewport.height
    canvas.width = viewport.width
    
    if (context) {
      await page.render({ canvasContext: context, viewport }).promise
      const link = document.createElement("a")
      link.download = "page-1.png"
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  // 6. Image Compressor
  const compressImage = async () => {
    if (!preview) return;
    const img = new Image();
    img.src = preview;
    await new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.drawImage(img, 0, 0);
        const compressed = canvas.toDataURL("image/jpeg", parseFloat(quality));
        const link = document.createElement("a");
        link.download = "compressed.jpg";
        link.href = compressed;
        link.click();
        resolve(true);
      };
    });
  };

  // 7. Image Resizer
  const resizeImage = async () => {
    if (!preview || !width || !height) return;
    const img = new Image();
    img.src = preview;
    await new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = parseInt(width);
        canvas.height = parseInt(height);
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const resized = canvas.toDataURL();
        const link = document.createElement("a");
        link.download = "resized.png";
        link.href = resized;
        link.click();
        resolve(true);
      };
    });
  };

  // 8. Text to PDF
  const createTextPDF = async () => {
    if (!textInput) return;
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    doc.text(textInput, 10, 10);
    doc.save("file.pdf");
  };

  // 9. Word Counter
  const countWords = (val: string) => {
    setTextInput(val)
    const words = val.trim().split(/\s+/).filter(w => w);
    setOutputResult("Words: " + words.length);
  };

  // 10. Password Generator
  const genPass = () => {
    let chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let p="";
    for(let i=0; i<parseInt(passwordLen); i++) {
       p += chars[Math.floor(Math.random()*chars.length)];
    }
    setOutputResult(p);
  };

  // 11. Basic Calculator
  const calcResult = () => {
    try {
      // eslint-disable-next-line no-eval
      setOutputResult(eval(textInput));
    } catch(e) {
      setOutputResult("Error");
    }
  };

  const renderUploader = (accept: string) => (
    <div className="border-2 border-dashed border-border/50 rounded-[2rem] p-12 text-center hover:bg-white/5 transition-colors cursor-pointer relative group">
      <input type="file" accept={accept} onChange={handleFile} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
      <Upload className="w-12 h-12 mx-auto mb-4 opacity-50 group-hover:text-primary group-hover:opacity-100 transition-colors" />
      <h3 className="text-xl font-bold mb-2">Upload File</h3>
      <p className="opacity-60 text-sm">Drag and drop or click to browse</p>
      {file && <p className="mt-4 text-primary font-mono text-sm">{file.name}</p>}
    </div>
  )

  return (
    <Card className="glass-premium border border-border/30 shadow-2xl p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem]">
      <div className="space-y-8">
        <h2 className="text-2xl font-black">{activeTool.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h2>
        
        {/* Branch per activeTool */}
        {(activeTool === 'image-converter' || activeTool === 'image-to-pdf') && (
          <div className="grid gap-6">
            {renderUploader("image/*")}
            
            {preview && activeTool === 'image-converter' && (
              <div className="flex gap-4">
                <button onClick={() => handleAction(() => convertImage('image/png'))} className="flex-1 h-14 bg-primary text-primary-foreground font-black rounded-2xl flex items-center justify-center gap-2 hover:brightness-110">
                  {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <FileDown className="w-5 h-5" />} Convert to PNG
                </button>
                <button onClick={() => handleAction(() => convertImage('image/jpeg'))} className="flex-1 h-14 bg-primary text-primary-foreground font-black rounded-2xl flex items-center justify-center gap-2 hover:brightness-110">
                  {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <FileDown className="w-5 h-5" />} Convert to JPG
                </button>
              </div>
            )}

            {preview && activeTool === 'image-to-pdf' && (
              <button onClick={() => handleAction(convertImageToPDF)} className="w-full h-14 bg-primary text-primary-foreground font-black rounded-2xl flex items-center justify-center gap-2 hover:brightness-110">
                {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />} Convert to PDF
              </button>
            )}
            
            {preview && (
              <div className="rounded-xl overflow-hidden border border-border/20 bg-black/40 p-4">
                <img src={preview} alt="Preview" className="max-h-[300px] mx-auto object-contain rounded-lg" />
              </div>
            )}
          </div>
        )}

        {(activeTool === 'html-to-pdf' || activeTool === 'html-to-png') && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-sm font-bold opacity-70">Enter HTML Content</label>
              <textarea 
                value={htmlContent}
                onChange={e => setHtmlContent(e.target.value)}
                className="w-full h-[300px] bg-black/40 border border-border/30 rounded-2xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
              />
            </div>
            <div className="space-y-4">
              <label className="text-sm font-bold opacity-70">Live Preview</label>
              <div id="html-content-preview" className="w-full h-[300px] bg-white text-black border border-border/30 rounded-2xl p-8 overflow-auto" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>

            <div className="lg:col-span-2">
              <button onClick={() => handleAction(activeTool === 'html-to-pdf' ? convertHTMLToPDF : convertHTMLToPNG)} className="w-full h-14 bg-primary text-primary-foreground font-black rounded-2xl flex items-center justify-center gap-2 hover:brightness-110">
                {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : (activeTool === 'html-to-pdf' ? <FileText className="w-5 h-5" /> : <FileImage className="w-5 h-5" />)} 
                Download as {activeTool === 'html-to-pdf' ? 'PDF' : 'PNG'}
              </button>
            </div>
          </div>
        )}

        {activeTool === 'pdf-to-image' && (
          <div className="grid gap-6">
            {renderUploader("application/pdf")}
            {file && (
              <button onClick={() => handleAction(convertPDFToImage)} className="w-full h-14 bg-primary text-primary-foreground font-black rounded-2xl flex items-center justify-center gap-2 hover:brightness-110">
                {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <FileImage className="w-5 h-5" />} Extract First Page to Image
              </button>
            )}
          </div>
        )}

        {(activeTool === 'image-compressor' || activeTool === 'image-resizer') && (
          <div className="grid gap-6">
            {renderUploader("image/*")}
            {preview && (
              <div className="space-y-4">
                <img src={preview} alt="Preview" className="max-h-[200px] mx-auto rounded-lg" />
                
                {activeTool === 'image-compressor' && (
                  <div className="space-y-4">
                    <label className="text-sm font-bold opacity-70">Quality: {quality}</label>
                    <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={e => setQuality(e.target.value)} className="w-full" />
                    <button onClick={() => handleAction(compressImage)} className="w-full h-14 bg-primary text-primary-foreground font-black rounded-2xl flex items-center justify-center gap-2 hover:brightness-110">
                      Compress & Download
                    </button>
                  </div>
                )}

                {activeTool === 'image-resizer' && (
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" placeholder="Width" value={width} onChange={e => setWidth(e.target.value)} className="h-14 bg-black/40 border border-border/30 rounded-xl px-4 text-center font-bold" />
                    <input type="number" placeholder="Height" value={height} onChange={e => setHeight(e.target.value)} className="h-14 bg-black/40 border border-border/30 rounded-xl px-4 text-center font-bold" />
                    <button onClick={() => handleAction(resizeImage)} className="col-span-2 h-14 bg-primary text-primary-foreground font-black rounded-2xl flex items-center justify-center gap-2 hover:brightness-110">
                      Resize & Download
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {['text-to-pdf', 'word-counter', 'case-converter'].includes(activeTool) && (
          <div className="space-y-4">
            <textarea 
              value={textInput}
              onChange={e => activeTool === 'word-counter' ? countWords(e.target.value) : setTextInput(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full h-[250px] bg-black/40 border border-border/30 rounded-2xl p-4 font-medium focus:ring-2 focus:ring-primary outline-none resize-none"
            />
            {activeTool === 'text-to-pdf' && (
              <button onClick={() => handleAction(createTextPDF)} className="w-full h-14 bg-primary text-primary-foreground font-black rounded-2xl flex items-center justify-center gap-2 hover:brightness-110">
                Download PDF
              </button>
            )}
            {activeTool === 'word-counter' && (
              <p className="text-2xl font-black text-center">{outputResult || "Words: 0"}</p>
            )}
            {activeTool === 'case-converter' && (
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setTextInput(textInput.toUpperCase())} className="h-14 bg-primary text-primary-foreground font-black rounded-2xl hover:brightness-110">UPPERCASE</button>
                <button onClick={() => setTextInput(textInput.toLowerCase())} className="h-14 bg-primary text-primary-foreground font-black rounded-2xl hover:brightness-110">lowercase</button>
              </div>
            )}
          </div>
        )}

        {activeTool === 'password-generator' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold opacity-70">Password Length</label>
              <input type="number" value={passwordLen} onChange={e => setPasswordLen(e.target.value)} className="w-full h-14 bg-black/40 border border-border/30 rounded-xl px-4 font-bold text-center" />
            </div>
            <button onClick={genPass} className="w-full h-14 bg-primary text-primary-foreground font-black rounded-2xl hover:brightness-110">
              Generate Password
            </button>
            {outputResult && (
              <div className="p-6 bg-accent/20 rounded-2xl text-center text-accent break-all font-mono font-bold text-xl select-all">
                {outputResult}
              </div>
            )}
          </div>
        )}

        {activeTool === 'color-picker' && (
          <div className="space-y-8 text-center flex flex-col items-center">
            <input type="color" value={colorCode} onChange={e => setColorCode(e.target.value)} className="w-32 h-32 rounded-full cursor-pointer" />
            <p className="text-4xl font-mono font-black select-all" style={{ color: colorCode }}>{colorCode.toUpperCase()}</p>
          </div>
        )}

        {activeTool === 'basic-calculator' && (
          <div className="space-y-4">
            <input 
              value={textInput} 
              onChange={e => setTextInput(e.target.value)} 
              placeholder="e.g. (150 * 2) / 5"
              className="w-full h-16 bg-black/40 border border-border/30 rounded-2xl px-6 font-mono text-xl tracking-widest text-center"
            />
            <button onClick={calcResult} className="w-full h-16 bg-primary text-primary-foreground font-black rounded-2xl text-xl hover:brightness-110">
              Calculate =
            </button>
            {outputResult && (
              <p className="text-4xl font-black text-center text-accent break-all bg-accent/10 p-6 rounded-2xl">
                {outputResult}
              </p>
            )}
          </div>
        )}

      </div>
    </Card>
  )
}
