function dataToSort(N) {
    this.d = [];
    for (var i = 0; i < N; i++) {
      this.d.push(i);
    }
  
    this.show = function () {
      fill(255);
      rect(20,30,40,50);
    }
}