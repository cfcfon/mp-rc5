"use strict";
function createImage(url, cb) {
    var image = new Image();
    image.onload = function () {
        cb(image);
    };
    image.src = url;
}
exports.createImage = createImage;
var resizeAreaId = 'imageupload-resize-area';
function getResizeArea() {
    var resizeArea = document.getElementById(resizeAreaId);
    if (!resizeArea) {
        resizeArea = document.createElement('canvas');
        resizeArea.id = resizeAreaId;
        resizeArea.style.visibility = 'hidden';
        document.body.appendChild(resizeArea);
    }
    return resizeArea;
}
function resizeImage(origImage, _a) {
    var _b = _a === void 0 ? {} : _a, resizeMaxHeight = _b.resizeMaxHeight, resizeMaxWidth = _b.resizeMaxWidth, _c = _b.resizeQuality, resizeQuality = _c === void 0 ? 0.7 : _c, _d = _b.resizeType, resizeType = _d === void 0 ? 'image/png' : _d;
    var canvas = getResizeArea();
    var height = origImage.height;
    var width = origImage.width;
    // calculate the width and height, constraining the proportions
    if (width > height) {
        if (width > resizeMaxWidth) {
            height = Math.round(height *= resizeMaxWidth / width);
            width = resizeMaxWidth;
        }
    }
    else {
        if (height > resizeMaxHeight) {
            width = Math.round(width *= resizeMaxHeight / height);
            height = resizeMaxHeight;
        }
    }
    canvas.width = width;
    canvas.height = height;
    //draw image on canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(origImage, 0, 0, width, height);
    // get the data from canvas as 70% jpg (or specified type).
    return canvas.toDataURL(resizeType, resizeQuality);
}
exports.resizeImage = resizeImage;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9uZzItc2VydmljZS9uZzItaW1hZ2V1cGxvYWQvc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxxQkFBNEIsR0FBVyxFQUFFLEVBQWlDO0lBQ3hFLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7SUFDeEIsS0FBSyxDQUFDLE1BQU0sR0FBRztRQUNiLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNaLENBQUMsQ0FBQztJQUNGLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLENBQUM7QUFOZSxtQkFBVyxjQU0xQixDQUFBO0FBRUQsSUFBTSxZQUFZLEdBQUcseUJBQXlCLENBQUM7QUFFL0M7SUFDRSxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZELEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNoQixVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxVQUFVLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQztRQUM3QixVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDdkMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELE1BQU0sQ0FBb0IsVUFBVSxDQUFDO0FBQ3ZDLENBQUM7QUFFRCxxQkFBNEIsU0FBMkIsRUFBRSxFQUtwQztRQUxvQyw0QkFLcEMsRUFKbkIsb0NBQWUsRUFDZixrQ0FBYyxFQUNkLHFCQUFtQixFQUFuQix3Q0FBbUIsRUFDbkIsa0JBQXdCLEVBQXhCLDZDQUF3QjtJQUd4QixJQUFJLE1BQU0sR0FBRyxhQUFhLEVBQUUsQ0FBQztJQUU3QixJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQzlCLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFFNUIsK0RBQStEO0lBQy9ELEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDdEQsS0FBSyxHQUFHLGNBQWMsQ0FBQztRQUN6QixDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLGVBQWUsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUN0RCxNQUFNLEdBQUcsZUFBZSxDQUFDO1FBQzNCLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFFdkIsc0JBQXNCO0lBQ3RCLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFOUMsMkRBQTJEO0lBQzNELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBbENlLG1CQUFXLGNBa0MxQixDQUFBIiwiZmlsZSI6InNoYXJlZC9uZzItc2VydmljZS9uZzItaW1hZ2V1cGxvYWQvc3JjL3V0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZXNpemVPcHRpb25zfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW1hZ2UodXJsOiBzdHJpbmcsIGNiOiAoaTogSFRNTEltYWdlRWxlbWVudCkgPT4gdm9pZCkge1xuICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgY2IoaW1hZ2UpO1xuICB9O1xuICBpbWFnZS5zcmMgPSB1cmw7XG59XG5cbmNvbnN0IHJlc2l6ZUFyZWFJZCA9ICdpbWFnZXVwbG9hZC1yZXNpemUtYXJlYSc7XG5cbmZ1bmN0aW9uIGdldFJlc2l6ZUFyZWEoKSB7XG4gIGxldCByZXNpemVBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocmVzaXplQXJlYUlkKTtcbiAgaWYgKCFyZXNpemVBcmVhKSB7XG4gICAgcmVzaXplQXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHJlc2l6ZUFyZWEuaWQgPSByZXNpemVBcmVhSWQ7XG4gICAgcmVzaXplQXJlYS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZXNpemVBcmVhKTtcbiAgfVxuXG4gIHJldHVybiA8SFRNTENhbnZhc0VsZW1lbnQ+cmVzaXplQXJlYTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2l6ZUltYWdlKG9yaWdJbWFnZTogSFRNTEltYWdlRWxlbWVudCwge1xuICByZXNpemVNYXhIZWlnaHQsXG4gIHJlc2l6ZU1heFdpZHRoLFxuICByZXNpemVRdWFsaXR5ID0gMC43LFxuICByZXNpemVUeXBlID0gJ2ltYWdlL3BuZydcbn06IFJlc2l6ZU9wdGlvbnMgPSB7fSkge1xuXG4gIGxldCBjYW52YXMgPSBnZXRSZXNpemVBcmVhKCk7XG5cbiAgbGV0IGhlaWdodCA9IG9yaWdJbWFnZS5oZWlnaHQ7XG4gIGxldCB3aWR0aCA9IG9yaWdJbWFnZS53aWR0aDtcblxuICAvLyBjYWxjdWxhdGUgdGhlIHdpZHRoIGFuZCBoZWlnaHQsIGNvbnN0cmFpbmluZyB0aGUgcHJvcG9ydGlvbnNcbiAgaWYgKHdpZHRoID4gaGVpZ2h0KSB7XG4gICAgaWYgKHdpZHRoID4gcmVzaXplTWF4V2lkdGgpIHtcbiAgICAgIGhlaWdodCA9IE1hdGgucm91bmQoaGVpZ2h0ICo9IHJlc2l6ZU1heFdpZHRoIC8gd2lkdGgpO1xuICAgICAgd2lkdGggPSByZXNpemVNYXhXaWR0aDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGhlaWdodCA+IHJlc2l6ZU1heEhlaWdodCkge1xuICAgICAgd2lkdGggPSBNYXRoLnJvdW5kKHdpZHRoICo9IHJlc2l6ZU1heEhlaWdodCAvIGhlaWdodCk7XG4gICAgICBoZWlnaHQgPSByZXNpemVNYXhIZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgLy9kcmF3IGltYWdlIG9uIGNhbnZhc1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBjdHguZHJhd0ltYWdlKG9yaWdJbWFnZSwgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgLy8gZ2V0IHRoZSBkYXRhIGZyb20gY2FudmFzIGFzIDcwJSBqcGcgKG9yIHNwZWNpZmllZCB0eXBlKS5cbiAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwocmVzaXplVHlwZSwgcmVzaXplUXVhbGl0eSk7XG59XG5cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9